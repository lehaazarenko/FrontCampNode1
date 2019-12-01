const getAllButton = document.getElementById('get-all'),
	  getByIdButton = document.getElementById('get-by-id'),
	  postAllButton = document.getElementById('post-all'),
	  editNewsItemButton = document.getElementById('edit-item'),
	  addNewsItemButton = document.getElementById('add-item'),
	  deleteNewsItemButton = document.getElementById('delete-item'),
	  checkErrorHandlerButton = document.getElementById('check-error-handler');

const baseUrl = 'http://localhost:3001';

const getAllNews = () => {
    axios.get(baseUrl + '/news')
        .then((response) => {
            console.log('response:', response);
        })
        .catch((error) => {
            console.log('error:', error);
        });
};

const postAllNews = () => {
    axios.post(baseUrl + '/news')
        .then((response) => {
            console.log('response:', response);
        })
        .catch((error) => {
            console.log('error:', error);
        });
};

const getNewsItemById = (id) => {
    axios.get(baseUrl + '/news/' + id)
        .then((response) => {
            console.log('response:', response);
        })
        .catch((error) => {
            console.log('error:', error);
        });
};

const editNewsItem = (id, editData) => {
    axios.post(baseUrl + '/news/edit/' + id, editData)
        .then((response) => {
            console.log('response:', response);
        })
        .catch((error) => {
            console.log('error:', error);
        });
};

const addNewsItem = (data) => {
    axios.put(baseUrl + '/news/add/', data)
        .then((response) => {
            console.log('response:', response);
        })
        .catch((error) => {
            console.log('error:', error);
        });
};

const deleteNewsItem = (id) => {
    axios.delete(baseUrl + '/news/delete/' + id)
        .then((response) => {
            console.log('response:', response);
        })
        .catch((error) => {
            console.log('error:', error);
        });
};

getAllButton.addEventListener('click', getAllNews);
getByIdButton.addEventListener('click', () => getNewsItemById(2));
deleteNewsItemButton.addEventListener('click', () => deleteNewsItem(3));
postAllButton.addEventListener('click', postAllNews);
editNewsItemButton.addEventListener('click', () => editNewsItem(2, {
    author: "Alexei Azarenko"
}));
addNewsItemButton.addEventListener('click', () => addNewsItem({
    author: "Alexei Azarenko",
    content: "New item content",
    desciption: "New iten desciption",
    sourse: {
        id: "my-mind",
        name: "My Mind"
    }
}));
checkErrorHandlerButton.addEventListener('click', () => getNewsItemById(98));
