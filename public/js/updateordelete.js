// document.querySelector("#updateform").addEventListener("submit",event=>{
//     event.preventDefault();
//     const blogUpdateObj = {
//         blog_title:document.querySelector("#title").value,
//         blogpost:document.querySelector("#posting").value
//     }
//     console.log(blogUpdateObj)
//     fetch("/api/blogs",{
//         method:"PUT",
//         body:JSON.stringify(blogUpdateObj),
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }).then(res=>{
//         if(res.ok){
//            location.href="/dashboard"
//         } else {
//             alert("trumpet sound")
//         }
//     })
// })

// document.querySelector("#updateForm").addEventListener("click",event=>{
//         event.preventDefault();

// let testOfSessionStorage = sessionStorage.getItem('blogExtracted')
// console.log("========================================")
// console.log(`Test of sessionStorage value of key blogExtracted: ${testOfSessionStorage}`)
// console.log("========================================")
//     })    

    document.querySelector("#updateForm").addEventListener("submit",event=>{
        // console.log("=========================")
        // console.log("Test of fetch request at dashboard.js after blog post creation")
        // console.log("=========================")
        let testOfSessionStorage = sessionStorage.getItem('blogExtracted')
        event.preventDefault();
        const blogObj5 = {
            blog_title:document.querySelector("#title2").value,
            blogpost:document.querySelector("#posting2").value
        }
        console.log("Test of blogObj5",blogObj5)
        fetch(`/api/blogs/${testOfSessionStorage}`,{
            method:"put",
            body:JSON.stringify(blogObj5),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
               location.href="/dashboard"
            //    console.log("=========================")
            //    console.log("Test of redirect after blog post update")
            //    console.log("=========================")
            } else {
                alert("Please login before creating a blog post")
            }
        })
    })

    // delete a blog post event listener for button and fetch request to delete route
    document.querySelector("#deleteButton").addEventListener("click", event=>{
        let testOfSessionStorage2 = sessionStorage.getItem('blogExtracted')
        event.preventDefault();
        fetch(`/api/blogs/${testOfSessionStorage2}`, {
          method:"delete",
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res=>{
            if(res.ok){
               location.href="/dashboard"
               console.log("=========================")
               console.log("Test of redirect after blog post update")
               console.log("=========================")
            } else {
                alert("Please login before creating a blog post")
            }
        })
        

    })


// Saturday March 4 2023 @ 6:33pm
// adding click detection for each section
// document.querySelectorAll(".box").forEach(section=> {
//     section.addEventListener('click', (e) => {
//         console.log("A section box has been detected")
//         fetch("/api/blogs",{
//             method:"PUT",
//             body:JSON.stringify(blogObj),
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         }).then(res=>{
//             if(res.ok){
//                location.href="/dashboard"
//             //    console.log("=========================")
//             //    console.log("Test of redirect after blog post creation")
//             //    console.log("=========================")
//             } else {
//                 alert("Please login before updating a blog post")
//             }
//         })
//     })
// })