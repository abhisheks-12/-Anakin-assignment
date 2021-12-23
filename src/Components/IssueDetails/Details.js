import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { pageProvider } from "../../App";
import "./Details.css";

const Details = () => {
  const { pageNo } = useContext(pageProvider);
  const [issues, setIssues] = React.useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const { id } = useParams();

  console.log(id);
  const fetchIsuues = async () => {
    const request = await fetch(
      `https://api.github.com/repos/freecodecamp/freecodecamp/issues?page=${pageNo}&per_page=20`
    );
    const response = await request.json();
    setIssues(response);
  };

  // console.log(issues);
  // console.log(id);

  useEffect(() => {
    fetchIsuues();
  }, [id]);

  return (
    <div className="details_issue">
      <div class="card " style={{ width: "45rem", height: "30rem" }}>
        <div class="card-body">
          {issues
            .filter((list) => list.id === id)
            .map((data) => (
              <p>{data}</p>
            ))}
          <h1>Hello</h1>
        </div>
      </div>
    </div>
  );
};

export default Details;
