import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { postNewArticle } from "../../WebAPI";
import { useHistory } from "react-router";

const PostPageContainer = styled.div``;

const PostForm = styled.form``;

const PostTitle = styled.input`
  display: block;
  margin-top: 12px;
`;

const PostBody = styled.textarea`
  display: block;
  margin-top: 12px;
`;

const PostSubmitButton = styled.input`
  margin-top: 16px;
`;

export default function PostPage() {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const history = useHistory();

  function handlePostSubmit(e) {
    e.preventDefault();
    console.log(postTitle, postBody);
    postNewArticle(postTitle, postBody).then((response) => {
      if (response.id) {
        history.push("/");
      }
    });
  }

  function handleChangePostTitle(e) {
    setPostTitle(e.target.value);
  }

  function handleChangePostBody(e) {
    setPostBody(e.target.value);
  }

  return (
    <PostPageContainer>
      <PostForm onSubmit={handlePostSubmit}>
        <h2>發佈前請先三思...</h2>
        <PostTitle
          required
          value={postTitle}
          onChange={handleChangePostTitle}
          placeholder="請輸入標題名稱"
        ></PostTitle>
        <PostBody
          required
          value={postBody}
          onChange={handleChangePostBody}
          rows="10"
          cols="30"
          placeholder="請輸入內容..."
        ></PostBody>
        <PostSubmitButton type="submit"></PostSubmitButton>
      </PostForm>
    </PostPageContainer>
  );
}
