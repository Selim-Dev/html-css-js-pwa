let users, usersContainer;
const fillselect = async () => {
  let userBeforeJson = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  );
  let usersData = await userBeforeJson.json();
  users.innerHTML = usersData.map((user) => {
    return `<option value="${user.id}">${user.name}</option>`;
  });
};

const getUserPosts = async (event) => {
  const postsPromise = await fetch(
    'https://jsonplaceholder.typicode.com/posts?userId=' + event.target.value
  );
  const posts = await postsPromise.json();
  usersContainer.innerHTML = posts.map(
    (post) => `
	<div class="card d-inline-block" style="width: 18rem;">
	<img src="./images/js2.png" class="card-img-top" alt="...">
	<div class="card-body">
		<h5 class="card-title">${post.title.substring(0, 20)}</h5>
		<p class="card-text">${post.body.substring(0, 50)}</p>
	</div>
</div>
`
  );
};
window.onload = async () => {
  users = this.document.getElementById('postsselects');
  usersContainer = this.document.getElementById('postscontainer');
  users.addEventListener('change', await getUserPosts);
  await fillselect();
  if (!this.navigator.serviceWorker)
    console.log('Service worker Not Supported');
  try {
    await this.navigator.serviceWorker.register('./service-worker.js');
    console.log('Service Worker Registered');
  } catch (error) {
    console.log('Service Worker Not Registered', error);
  }
};
