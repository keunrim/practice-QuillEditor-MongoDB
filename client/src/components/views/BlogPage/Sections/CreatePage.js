import React, { useState } from "react";
import { Typography, Button, Form, message } from "antd"; // ant 디자인
import axios from "axios";
import { useSelector } from "react-redux"; //리액트 리덕스
import QuillEditor from "../../../editor/QuillEditor";

const { Title } = Typography; // 타이포그라피를 타이틀로 선언

function CreatePage(props) {
  const user = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const onEditorChange = (value) => {
    setContent(value);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setContent("");
    if (user.userData && !user.userData.isAuth) {
      return alert("Plaease Log in First !");
    }
    const variables = {
      content: content,
      writer: user.userData._id,
    };
    axios.post("/api/blog/createPost", variables).then((response) => {
      if (response.data.success) {
        message.success("Post Created!");
        setTimeout(() => {
          console.log(props);
          props.history.push("/blog");
        }, 2000);
      }
    });
  };

  return (
    <div>
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2}>Editor</Title>
        </div>
        <QuillEditor
          placeholder={"Start Posting Something"}
          onEditorChange={onEditorChange}
          onFilesChange={onFilesChange}
        />
        <Form onSubmit={onSubmit}>
          <div style={{ textAlign: "center", margin: "2rem" }}>
            <Button
              size="large"
              htmlType="submit"
              className=""
              onSubmit={onSubmit}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreatePage;
