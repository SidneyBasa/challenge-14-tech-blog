document.querySelector("#dashboardForm").addEventListener("submit",event=>{
    // console.log("=========================")
    // console.log("Test of fetch request at dashboard.js after blog post creation")
    // console.log("=========================")
    event.preventDefault();
    const blogObj = {
        blog_title:document.querySelector("#title").value,
        blogpost:document.querySelector("#posting").value
    }
    console.log(blogObj)
        //    console.log("=========================")
        //    console.log("Test of fetch request at dashboard.js after blog post creation")
        //    console.log("=========================")
    // Creating a blogpost
    // http://api/blogs
    fetch("/api/blogs",{
        method:"POST",
        body:JSON.stringify(blogObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/dashboard"
        //    console.log("=========================")
        //    console.log("Test of redirect after blog post creation")
        //    console.log("=========================")
        } else {
            alert("Please login before creating a blog post")
        }
    })
})

console.log("Test of of console log")

document.querySelectorAll(".box").forEach(section=> {
    section.addEventListener('click', (event) => {
        event.preventDefault();
        // console.log("A section box has been detected")
        // console.log("test", document.querySelector("#title").value)
        // console.log("test document", document)
        // console.log("test of event", event)
        // console.log("test of Blogs", Blogs)
        // const blogObj2 = {
        // const blog_id = document.querySelector("#id_section")
        // blogpost:document.querySelector("#p").value
    // }
    // console.log("Test of blog ID", blog_id)

    const get_section_id = event.target.getAttribute("data-id")
    console.log("test of get attribute id_section", get_section_id)
    
    // console.log("test of event", event)
    // console.log("test of event.AT_TARGET", event.AT_TARGET)
    // console.log("test of event.target", event.target)
    // console.log("test of event.target", event.JSON)
    // console.log("test of event.blogObj", event.blogObj)
    // console.log("test of event.target.value", event.target.value)
    // console.log("test of event.getAttribute", event.target.getAttribute('id_section'))
    // console.log("test of event.getAttribute", event.target.getAttribute('#id_section'))
    // console.log("test of event.getAttribute('data-id')", event.target.getAttribute('data-id'))


            //    location.href="/updateordelete"
   
        // fetch("/api/blogs",{
        //     method:"PUT",
        //     body:JSON.stringify(blogObj),
        //     headers:{
        //         "Content-Type":"application/json"
        //     }
        // }).then(res=>{
        //     if(res.ok){
        //        location.href="/dashboard"

        //     } else {
        //         alert("Please login before updating a blog post")
        //     }
        // })
    })
})

// ======= Test successfull to return ID of one section box =============
// document.querySelector(".box").addEventListener("click",event=>{

//     event.preventDefault();
//     const blogObj3 = {
//         id_section:document.querySelector("#id_section")
//     }
//     console.log(blogObj3)
//     // console.log(blogObj3[1])
//     console.log(blogObj3.id_section.innerHTML)

//     // Creating a blogpost
//     // http://api/blogs
//     // fetch("/api/blogs",{
//     //     method:"POST",
//     //     body:JSON.stringify(blogObj),
//     //     headers:{
//     //         "Content-Type":"application/json"
//     //     }
//     // })
//     // .then(res=>{
//     //     if(res.ok){
//     //        location.href="/dashboard"

//     //     } else {
//     //         alert("Please login before creating a blog post")
//     //     }
//     // })
// })
// ======= Test successfull to return ID of one section box =============