// Monday March 6 2023
// first usage of addEventListener mouseover

// heroku deployment comment
// event listener when a comment box is moused over
// stores the comment-data-id attribute in session storage
document.querySelectorAll("#commented").forEach(a => {
    a.addEventListener('mouseover', (event) => {
        event.preventDefault();

    const get_comment_id = event.target.getAttribute("comment-data-id")
    // console.log("test of get attribute id_section", get_section_id)

    sessionStorage.setItem('commentExtracted', get_comment_id)

    console.log(`Mouse over comment detection with comoment ID:${get_comment_id}`)

    })
})