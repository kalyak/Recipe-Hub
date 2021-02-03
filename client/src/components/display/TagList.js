import { Button, Row } from "react-bootstrap";

const TagList = (props) => {
  const listTags = props.tags.map((tag) => {
    return <Button key={tag._id}>{tag.tagName}</Button>;
  });

  return (
    <>
      <h2>Tags</h2>
      {listTags}
    </>
  );
};

export default TagList;
