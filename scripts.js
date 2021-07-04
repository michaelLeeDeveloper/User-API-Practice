const usersDiv = document.querySelector("#users");
const postsDiv = document.querySelector("#posts");



const getUsers = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const allUsers = await response.json();
        console.log(allUsers);
        const tbl = document.createElement("table");
        tbl.style.width = '100%';
        tbl.setAttribute('border', '1');
        const tblBody = document.createElement("tbody");
        tbl.append(tblBody);
        allUsers.map(user => {
            const userRow = document.createElement("tr");
            const userId = document.createElement("td");
            userId.innerText = user.id;
            userRow.append(userId);
            const userName = document.createElement("td");
            userName.innerText = user.name;
            userRow.append(userName);
            const userPhone = document.createElement("td");
            userPhone.innerText = user.phone;
            userRow.append(userPhone);
            const userCompany = document.createElement("td");
            userCompany.innerText = user.company.name;
            userRow.append(userCompany);
            const userEmail = document.createElement("td");
            userEmail.innerText = user.email;
            userRow.append(userEmail);
            tblBody.append(userRow);
            userRow.addEventListener("click", function () {
                showPosts(user);
            })
        })
        usersDiv.append(tbl);
    } catch (e) {
        console.log("Something went wrong, ", e)
    }
}

async function showPosts({ id, name }) {
    const newLink = `https://jsonplaceholder.typicode.com/users/${id}/posts`;
    const response = await fetch(newLink);
    const allPosts = await response.json();
    console.log(allPosts);
    postsDiv.innerHTML = "";
    const header = document.createElement("h2");
    header.innerText = `${name}'s Posts`;
    postsDiv.append(header);
    allPosts.map(post => {
        const postContainer = document.createElement("div");
        const postTitle = document.createElement("h5");
        postTitle.innerText = `TITLE: ${post.title}`;
        postContainer.append(postTitle);
        const postBody = document.createElement("p");
        postBody.innerText = post.body;
        postContainer.append(postBody);
        postsDiv.append(postContainer);
    })
}

getUsers();