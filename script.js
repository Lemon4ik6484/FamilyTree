function playSound(url) {
    const audio = new Audio(url);
    audio.play();
}

const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('click', function(event) {playSound("./button.mp3")});

fileInput.addEventListener('change', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const jsonFile = fileInput.files[0];

    if (jsonFile) {
        const reader = new FileReader();

        reader.onload = function(e) {
            let Tree;
            try {
                Tree = JSON.parse(e.target.result);
            } catch (error) {
                alert("Error while reading file, please try again");
                return;
            }

            const mainTreeEl = document.getElementById("MainTree");
            mainTreeEl.innerHTML = "";

            document.getElementById("file-upload").classList.add("hiden");

            for (const genKey in Tree) {
                if (Tree.hasOwnProperty(genKey)) {
                    const couples = Tree[genKey];

                    const genDiv = document.createElement("div");
                    genDiv.classList.add("gen");
                    genDiv.id = genKey;

                    const coupleKeys = Object.keys(couples);
                    coupleKeys.forEach((coupleKey) => {
                        const couple = couples[coupleKey];

                        const coupleDiv = document.createElement("div");
                        coupleDiv.classList.add("couple");
                        coupleDiv.id = coupleKey;

                        const personElements = [];
                        for (const personKey in couple) {
                            if (couple.hasOwnProperty(personKey)) {
                                const person = couple[personKey];

                                const personDiv = document.createElement("div");
                                personDiv.classList.add("person", person.gender);

                                const photo = person.photo || "https://placehold.co/100";
                                personDiv.innerHTML = `<img class="photo" src="${photo}" alt="Photo"><br>`;

                                const pElement = document.createElement("p");
                                pElement.classList.add("description");
                                pElement.innerHTML = `
                                    <strong>${person.name} ${person.surname}</strong><br>
                                    ${person.birth}<br>
                                `;

                                personDiv.appendChild(pElement);
                                coupleDiv.appendChild(personDiv);
                                personElements.push(personDiv);
                            }
                        }

                        genDiv.appendChild(coupleDiv);

                        if (couple.children && couple.children.length > 0) {
                            const childrenDiv = document.createElement("div");
                            childrenDiv.classList.add("children");

                            couple.children.forEach(child => {
                                const childDiv = document.createElement("div");
                                childDiv.classList.add("child");
                                childDiv.innerHTML = `<strong>${child.name} ${child.surname}</strong><br>${child.birth}<br>`;

                                if (child.parents) {
                                    const parentDiv = document.createElement("div");
                                    parentDiv.innerHTML = `Parents: ${child.parents}`;
                                    childDiv.appendChild(parentDiv);
                                }

                                childrenDiv.appendChild(childDiv);
                            });

                            genDiv.appendChild(childrenDiv);
                        }
                    });

                    mainTreeEl.appendChild(genDiv);
                }
            }
            /*const closeButton = document.createElement("div");
            closeButton.classList.add("closeButton");
            document.body.insertBefore(closeButton, document.getElementById("fileForm"));*/
        };
        reader.readAsText(jsonFile);
        playSound("./load.mp3");
    }
});
