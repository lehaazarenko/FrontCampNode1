const getAllButton = document.getElementById('get-all'),
      getByIdButton = document.getElementById('get-by-id'),
      postAllButton = document.getElementById('post-all'),
      editNewsItemButton = document.getElementById('edit-item'),
      addNewsItemButton = document.getElementById('add-item'),
      deleteNewsItemButton = document.getElementById('delete-item'),
      checkErrorHandlerButton = document.getElementById('check-error-handler')
      getAllMongoButton = document.getElementById('get-all-mongo'),
      getByIdMongoButton = document.getElementById('get-by-id-mongo')
      addNewsItemMongoButton = document.getElementById('add-item-mongo'),
      editNewsItemMongoButton = document.getElementById('edit-item-mongo');

const baseUrl = 'http://localhost:3001';

const getAllNews = (isMongo = false) => {
    axios.get(baseUrl + (isMongo ? '/mongo' : '') + '/news')
        .then((response) => {
            console.log('response:', response);
        })
        .catch((error) => {
            console.log('error:', error);
        });
};

const postAllNews = (isMongo = false) => {
    axios.post(baseUrl + (isMongo ? '/mongo' : '') + '/news')
        .then((response) => {
            console.log('response:', response);
        })
        .catch((error) => {
            console.log('error:', error);
        });
};

const getNewsItemById = (id, isMongo = false) => {
    axios.get(baseUrl + (isMongo ? '/mongo' : '') + '/news/' + id)
        .then((response) => {
            console.log('response:', response);
        })
        .catch((error) => {
            console.log('error:', error);
        });
};

const editNewsItem = (id, editData, isMongo = false) => {
    axios.post(baseUrl + (isMongo ? '/mongo' : '') + '/news/edit/' + id, editData)
        .then((response) => {
            console.log('response:', response);
        })
        .catch((error) => {
            console.log('error:', error);
        });
};

const addNewsItem = (data, isMongo = false) => {
    axios.put(baseUrl + (isMongo ? '/mongo' : '') + '/news/add/', data)
        .then((response) => {
            console.log('response:', response);
        })
        .catch((error) => {
            console.log('error:', error);
        });
};

const deleteNewsItem = (id, isMongo = false) => {
    axios.delete(baseUrl + (isMongo ? '/mongo' : '') + '/news/delete/' + id)
        .then((response) => {
            console.log('response:', response);
        })
        .catch((error) => {
            console.log('error:', error);
        });
};

getAllButton.addEventListener('click', () => getAllNews(false));
getByIdButton.addEventListener('click', () => getNewsItemById(2, false));
deleteNewsItemButton.addEventListener('click', () => deleteNewsItem(3, false));
postAllButton.addEventListener('click', () => postAllNews(false));
editNewsItemButton.addEventListener('click', () => editNewsItem(2, {
    author: "Alexei Azarenko"
}, false));
addNewsItemButton.addEventListener('click', () => addNewsItem({
    author: "Alexei Azarenko",
    content: "New item content",
    description: "New iten description",
    sourse: {
        id: "my-mind",
        name: "My Mind"
    }
}, false));
checkErrorHandlerButton.addEventListener('click', () => getNewsItemById(98 ,false));

// For mongo

getAllMongoButton.addEventListener('click', () => getAllNews(true));
getByIdMongoButton.addEventListener('click', () => getNewsItemById(3, true));
addNewsItemMongoButton.addEventListener('click', () => addNewsItem({
    author: "Alexei Azarenko",
    content: "New item content",
    description: "New iten description",
    sourse: {
        id: "my-mind",
        name: "My Mind"
    }
}, true));
editNewsItemMongoButton.addEventListener('click', () => editNewsItem(2, {
    author: "John Doe"
}, true));
