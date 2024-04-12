import React, { useState } from "react";
import MicIcon from "../../assets/svg/MicIcon";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import HappyIcon from "../../assets/svg/HappyIcon";
import ImgBox from "../../assets/svg/ImgBox";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useParams } from "react-router-dom";
import { messageService } from "../../services/MessageService";
import { uploadFile } from "../../firebase/services.js";
import { useAppContext } from "../../Context/AppProvider.js";
import { useAppDispatch } from "../../store/store.js";
import { updateConversation } from "../../store/features/conversationSlice.js";
import { userSelector } from "../../store/selector/authSelector.js";
import { useSelector } from "react-redux";
import { currConversationSelector } from "../../store/selector/conversationSelector.js";

const InputMessage = () => {
  const dispatch = useAppDispatch();

  const user = useSelector(userSelector);
  const currConversation = useSelector(currConversationSelector);

  const { currentConversationId } = useParams();
  const { messageList, setMessageList } = useAppContext();

  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [files, setFiles] = useState<any>([]);

  const onEmojiClick = (e: any) => {
    const sym = "0x" + e.unified;
    const emoji = String.fromCodePoint(Number(sym));
    setInputStr(inputStr + emoji);
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== "\n") {
      setInputStr(e.target.value);
    }
  };

  const handleOnKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const keyCode = event.keyCode;
    const shiftKey = event.shiftKey;
    if (keyCode === 13 && !shiftKey) {
      const fileList = await Promise.all(
        files.map((file: any) => {
          if (file?.preview) {
            URL.revokeObjectURL(file.preview);
            return uploadFile(file.file, "images");
          }
          return uploadFile(file.file, "files");
        })
      );
      if (!inputStr && fileList.length === 0) return;
      const { data } = await messageService.createMessage({
        message: inputStr,
        conversationId: currentConversationId + "",
        files: fileList,
      });
      dispatch(
        updateConversation({
          currentConversation: currConversation,
          latest_message: data.data,
          userId: user._id,
        })
      );
      if (messageList.length > 0) {
        setMessageList([data.data, ...messageList]);
      } else {
        setMessageList([]);
      }
      setInputStr("");
      setFiles([]);
    }
  };

  const handleOnChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let f = e.target.files;
      let fileList: any = [];
      for (const file of f) {
        fileList.push({ file, preview: URL.createObjectURL(file) });
      }
      setFiles([...files, ...fileList]);
    }
  };

  const handleRemoveFile = (index: number) => {
    if (!files[index]) return;
    URL.revokeObjectURL(files[index].preview);
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="mx-5 flex items-end gap-3">
      <button className="w-8 h-8 overflow-hidden flex justify-center items-center relative">
        <div className="cursor-pointer">
          <ImgBox color="white" className="scale-125" />
        </div>
        <input
          type="file"
          multiple
          className="w-full h-full opacity-0 absolute cursor-pointer file:cursor-pointer"
          onChange={handleOnChangeFile}
        />
      </button>
      <div className="relative mb-1">
        <span
          onClick={(e) => {
            e.stopPropagation();
            setShowPicker((val) => !val);
          }}
          className="cursor-pointer"
        >
          <HappyIcon color="white" />
        </span>
        {showPicker && (
          <div className="absolute -translate-y-full -top-2 z-[1]">
            <Picker
              data={data}
              className={""}
              emojiSize={20}
              emojiButtonSize={30}
              previewPosition={"none"}
              onEmojiSelect={onEmojiClick}
              onClickOutside={() => setShowPicker(false)}
            />
          </div>
        )}
      </div>
      <div className="bg-[#543639] rounded-2xl flex flex-1 p-2 items-end min-h-3 w-full">
        <div className="pl-3 w-full">
          {files.length > 0 && (
            <ul className="flex gap-2 mb-3 w-full">
              {files.map((file: any, index: number) => (
                <li key={index} className="h-14 relative">
                  <img
                    src={file.preview}
                    alt=""
                    className="h-full rounded-md"
                  />
                  <span
                    className="absolute w-6 h-6 flex items-center justify-center rounded-full bg-[#543639] -top-1.5 -right-1.5 border border-gray-900 pb-0.5 cursor-pointer hover:bg-gray-600"
                    onClick={() => handleRemoveFile(index)}
                  >
                    x
                  </span>
                </li>
              ))}
            </ul>
          )}
          <ReactTextareaAutosize
            maxRows={6}
            className="textareaCustom block bg-transparent placeholder:text-white placeholder:opacity-60 w-full focus:outline-none autofill:clear-none text-base resize-none"
            value={inputStr}
            onChange={handleOnChangeInput}
            onKeyDown={handleOnKeyDown}
          />
        </div>
      </div>
      <button className="w-12 h-12 bg-[#543639] rounded-full flex items-center justify-center">
        <MicIcon color="white" />
      </button>
    </div>
  );
};

export default InputMessage;
