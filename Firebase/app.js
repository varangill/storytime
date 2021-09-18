const finalStory = document.querySelector('#final-story-list');

// Create element and render final stories
function renderStory(doc) {
    let li = document.createElement('li');
    let final_story = document.createElement('span');
    let written_by = document.createElement('span');

    li.setAttribute('data-id', doc.id);

    // Getting the data
    final_story.textContent = doc.data().final_story;
    written_by.textContent = doc.data().written_by;

    // Appending
    li.appendChild(final_story);
    li.appendChild(written_by);

    finalStory.appendChild(li);
}

db.collection('Stories').get().then((snapshot)=> {
    snapshot.docs.forEach(doc => {
        renderStory(doc);
        
    });
})