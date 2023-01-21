import { UploadVideoButton } from "../components/Videos/UploadVideos/UploadVideo";

export default function Page() {
  const title = "My Video Uploader";
  const subTitle = "Start Uploading you video by checking the button Below";
  const UploadButtonTitle = "Select File";
  const dragAreaSubtitle = "Drop file ..";
  return (
    <div>
      <UploadVideoButton
        title={title}
        subTitle={subTitle}
        UploadButtonTitle={UploadButtonTitle}
        dragAreaSubtitle={dragAreaSubtitle}
      />
    </div>
  );
}
