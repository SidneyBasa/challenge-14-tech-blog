
// event listener when the comment button is clicked
document.querySelector("#commentForm").addEventListener("submit",event=>{
    event.preventDefault();
    const commentObj = {
        comment:document.querySelector("#commentInput").value
    }
    console.log(commentObj)
    // Creating a blogpost
    // http://api/blogs
    
    // if(!request.session.userLoginId){
    //     return response.redirect("/login")
    // }

    // const get_comment_id = event.target.getAttribute("comment-data-id")
    get_comment_id = sessionStorage.getItem('commentExtracted')
    console.log('Test of get_comment_id', get_comment_id)

    createOneCommentFromThisID = `/api/comment/${get_comment_id}`
    console.log("test of createOneCommentFromThisID:", createOneCommentFromThisID)

    fetch(createOneCommentFromThisID,{
        method:"POST",
        body:JSON.stringify(commentObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(commentResponse=>{
        if(commentResponse.ok){
           location.href="/"
        return commentResponse.json()
        // console.log("Test of comment response", commentResponse)
        } else {
            alert("Please sign up or log in to leave a comment")
        }
    })
    // .then(function (ResponseData) {
    //     console.log("Test of comment response", ResponseData)
    // })
})