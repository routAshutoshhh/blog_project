/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

//this $id is given by the appwrite ifself here so its the syntax and we can't do anyrthing about it
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl px-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}
export default PostCard;
