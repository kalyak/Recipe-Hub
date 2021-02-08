import { Button, Row, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const TagList = (props) => {
  const listTags = props.tags.map((tag) => {
    return (
      <>
        <Link to={`/browse?tag=${tag._id}`}>
          <Badge pill variant="success" key={tag._id}>
            {tag.tagName}
          </Badge>
        </Link>
      </>
    );
  });

  return (
    <>
      <h2>Tags</h2>
      {listTags}
    </>
  );
};

export default TagList;
