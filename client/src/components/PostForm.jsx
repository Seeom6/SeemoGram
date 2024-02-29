import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch , useSelector } from "react-redux";
import toastMessage from "../utils/toastMessage";
import { createPostThunk } from "../Redux/thunk/asyncThunk";

const PostForm = () => {

  const dispatch = useDispatch()


  const [formPost, setFormPost] = useState({
    caption: "",
    imageUri: "",
    location: "",
    tags: "",
  });
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState([]);
  const getPhoto = (e) => {
    setImg(e.target.files[0]);
  };
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/svg+xml": [] },
    onDrop,
  });

  const changing = (event) => {
    setFormPost((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if(formPost.caption === '' && (formPost.imageUri === '' || undefined)){
          return toastMessage.ErrorMessage("Something went wrong ,Try to include image or caption")
      }
    if (file.length !== 0) {
      formPost.imageUri = file[0]?.path;
    }
    const formData = new FormData()
    formData.append("postImage" , file[0])
    formData.append("location" , formPost?.location)
    formData.append("caption" , formPost?.caption)
    formData.append("tags" , formPost?.tags)
    dispatch(createPostThunk(formData))
  };



  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-9 w-full max-w-5xl items-end"
    >
      <div className="w-full flex flex-col items-center space-y-2">
        <label className="w-full text-start">caption</label>
        <textarea
          onChange={(e) => changing(e)}
          type="textarea"
          name="caption"
          className="textarea-style w-full tracking-[.05em] text-start p-1"
        />
      </div>
      <div className="w-full   flex flex-col items-center input_shadow space-y-2">
        <label className="w-full text-start">Add photo</label>
        <div
          {...getRootProps()}
          className="flex flex-center flex-col bg-body-bg rounded-xl cursor-pointer"
        >
          <input {...getInputProps()} className="cursor-pointer" />
          {fileUrl ? (
            <>
              <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                <img src={fileUrl} alt="image" className="file_uploader-img" />
              </div>
              <p className="file_uploader-label input_shadow">
                Click or drag photo to replace
              </p>
            </>
          ) : (
            <div className="file_uploader-box">
              <img
                src="/assets/icons/file-upload.svg"
                alt="file-upload"
                width={96}
                height={77}
              />
              <h3 className="base-medium text-light-2 mb-2 mt-6">
                Drag photo here
              </h3>
              <p className="text-light-4 small-regular mb-6"> SVG, PNG, JPG</p>

              <button
                type="button"
                className="button-upload_dark_4  flex-center-center-col"
              >
                Select from computer
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-center space-y-2">
        <label className="w-full text-start">Add Location</label>
        <input
          onChange={(e) => changing(e)}
          type="text"
          name="location"
          className=" input-HSD-style tracking-[.1em]"
        />
      </div>
      <div className="w-full flex flex-col items-center  space-y-2">
        <label className="w-full text-start">
          Add Tags (separated by comma",")
        </label>
        <input
          onChange={(e) => changing(e)}
          type="text"
          placeholder="Art , Expression , Learn"
          name="tags"
          className="  input-HSD-style tracking-[.1em]"
        />
      </div>
      <div className="flex w-full l:w-1/2 gap-4  items-center justify-start">
        <button
          type="button"
          className="font-bold rounded-md bg-[#7e0e0e] p-5 flex-1 flex-center-center-col"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="button_primary p-5 flex-center-center-col flex-1"
        >
          {" "}
          Submit
        </button>
      </div>
    </form>
  );
};

export default PostForm;
