import { useEffect, useState } from "react";
import axios, { CancelToken } from "axios";
import { Box, Button, CardHeader, Grid, LinearProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface Props {
  title: string;
  subTitle: string;
  UploadButtonTitle: string;
  dragAreaSubtitle: string;
}
export const UploadVideoButton: React.FC<Props> = ({
  title,
  subTitle,
  UploadButtonTitle,
  dragAreaSubtitle,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [cancelToken, setCancelToken] = useState<CancelToken | null>(null);
  // localStorage.getItem("auth")

  const Token =
    "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQ5MTU4OTUsImlhdCI6MTY3NDMxMTA5NSwianRpIjoiMjIyMzkiLCJuYmYiOjE2NzQzMTA5NzUsInNjb3BlcyI6WyJhcGk6YWNjZXNzIl0sInN1YiI6ImNkMDJhM2FlLTkxZWUtNDA0Zi1iYWNlLTlkNzc0NWY0NzQwMyJ9.VbmJmm-J1WM0xqh7iub9Y0PIVYsYBtho2SenO_XRKTVFBY5k7Z0dJHEZw3nnMHnFWf79mWig97RWkS7Gs3pc4XcufpQxLh3tILVYL2ThLeqvJAabIrNF-zc5ycDr69ss8JHGhqc3pF0c2EAW_0KpCwSuFWC4f_2d6HjujQ2chWL73kb934tYyQGq0VCg1ILBM2xZhqb1Bbc951Cci1mTiozh56vZyFDT6JMrPqgrhgFWEFaqEljhZgD5spejjQaM8rjYi7cq3OHo90qiSx43zbUN9c7LXeHMufyZkkqOjVhxB_6oit9A5l6kdnH96zMWbkIoCqTscnPUUiSR5j0DuQ";
  useEffect(() => {
    if (!file || !isUploading) {
      return;
    }

    const source = axios.CancelToken.source();
    setCancelToken(source.token);

    const formData = new FormData();
    formData.append("file", file);
    const url = "https://api.staging.scribit.pro/v1/uploaded-videos";

    const config = {
      headers: {
        authorization: Token,
        "Content-Type": "application/json",
        accept: "application/vnd.storage.signed-url",
      },
      resumable: false,
      onUploadProgress: (progressEvent: { loaded: number; total: number }) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      },
      cancelToken: source.token,
    };

    axios
      .post(url, formData, config)
      .then((response: object) => {
        console.log({ response });
      })
      .catch((thrown: object) => {
        if (axios.isCancel(thrown)) {
          console.log("Request canceled", thrown?.message);
        } else {
          setError(true);
        }
      });

    return () => {
      source.cancel("Upload canceled by user.");
    };
  }, [file, isUploading]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
    setIsUploading(true);
  };

  const handleCancel = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setFile(null);
  };

  const handleResume = () => {
    setIsUploading(true);
  };

  return (
    <div className="outter_container">
      <CardHeader
        style={{ textAlign: "center" }}
        title={title}
        subheader={subTitle}
      />

      <div className="dropZoneContainer">
        <input
          type="file"
          id="drop_zone"
          className="FileUpload"
          onChange={handleUpload}
          accept="video/mp4,video/x-m4v,video/*"
        />

        <div className="dropZoneOverlay">
          <span className="btn">{UploadButtonTitle}</span>
          <span> {dragAreaSubtitle}</span>

          {isUploading && (
            <>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0",
                }}
              >
                {error && (
                  <Grid
                    item
                    sx={{
                      color: "red",
                      display: "flex",
                      padding: "0 10px 0 0",
                    }}
                    xs={8}
                  >
                    <ErrorOutlineIcon />
                  </Grid>
                )}
                {!error && uploadProgress === 100 && (
                  <Grid
                    item
                    sx={{
                      color: "primary",
                      display: "flex",
                      padding: "0 10px 0 0",
                    }}
                    xs={8}
                  >
                    <CheckIcon />
                  </Grid>
                )}
                {file && (
                  <Box style={{ textAlign: "left", margin: " 0 0 0 15px" }}>
                    {file.name}
                  </Box>
                )}

                <Button sx={{ zIndex: 2 }} onClick={handleCancel}>
                  <Grid item sx={{ color: "primary", display: "flex" }} xs={8}>
                    <ClearIcon />
                  </Grid>
                </Button>
              </Box>
              <Box>
                {error ? (
                  <p style={{ color: "red" }}>Upload Error </p>
                ) : (
                  <LinearProgress
                    sx={{ width: "100%", marginBottom: "5px" }}
                    color="primary"
                    variant="determinate"
                    value={uploadProgress}
                  />
                )}
              </Box>
            </>
          )}
          {/* <Button onClick={handleResume}>Resume</Button> */}
        </div>
      </div>
    </div>
  );
};
