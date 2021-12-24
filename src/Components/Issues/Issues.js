import React, { useEffect, useState, useContext } from "react";
import { pageProvider } from "../../App";
import "./Isuues.css";
import { Link } from "react-router-dom";

const Isuues = () => {
  // const [pageNo, setPageNo] = useState(1);
  const { pageNo, setPageNo } = useContext(pageProvider);
  const [issues, setIssues] = useState([]);
  const [allPages, setAllPages] = useState([1]);

  // getting data from api
  const fetchIsuues = async () => {
    const request = await fetch(
      `https://api.github.com/repos/freecodecamp/freecodecamp/issues?page=${pageNo}&per_page=20`
    );
    const response = await request.json();
    setIssues(response);
  };

  useEffect(() => {
    fetchIsuues();
  }, [pageNo]);

  // handelNextClick
  const handelNext = (e) => {
    e.preventDefault();
    const tempPages = [];
    for (let i = 1; i <= allPages.length + 1; i++) {
      // console.log(i);
      tempPages.push(i);
    }
    setAllPages([...tempPages]);
    setPageNo(pageNo + 1);
  };

  // handelPreviousClick
  const handelPrevious = (e) => {
    if (pageNo !== 1) {
      e.preventDefault();
      const tempPages = [];
      for (let i = 1; i < allPages.length; i++) {
        tempPages.push(i);
      }
      setAllPages([...tempPages]);
      setPageNo(pageNo - 1);
    }
  };

  // handling individual page
  const handelIndividualPage = (page, e) => {
    e.preventDefault();
    const tempPages = [];
    for (let i = 1; i <= page; i++) {
      tempPages.push(i);
    }
    setAllPages([...tempPages]);
    setPageNo(page);
  };

  return (
    <div className="issue-list">
      <div className="card " style={{ width: "80rem", borderRadius: "2px" }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <i class="far fa-dot-circle  open_circle" /> Open Issues{" "}
          </li>
          {issues &&
            issues.map((data) => (
              <div key={data.id}>
                <li className="list-group-item all_data">
                  <div className="comments_issues">
                    <p>
                      <Link to={`details/${data.id}`}>
                        <i class="far fa-dot-circle open_circle" /> {data.title}
                      </Link>
                    </p>
                    <p>
                      <a href="/" target="_blank">
                        <i class="far fa-comment-alt fa-sm" />
                      </a>
                      <span>{data.comments}</span>
                    </p>
                  </div>
                  <p className="user_data">
                    {data.number} opened by{" "}
                    <a href={data.user.html_url} target="_blank">
                      {data.user.login}
                    </a>
                  </p>
                </li>
              </div>
            ))}
        </ul>
      </div>
      


      <div className="pages">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="/" onClick={handelPrevious}>
                Previous
              </a>
            </li>

            {allPages.map((page) => (
              <li className="page-item" key={page}>
                <a
                  className="page-link"
                  href="/"
                  onClick={(e) => handelIndividualPage(page, e)}
                >
                  {page}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href="/" onClick={handelNext}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Isuues;
