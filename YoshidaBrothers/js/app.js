let checkAlbumLeftInterval = setInterval(checkAlbumLeft, 10);
let movingAlbumAnimationInterval = setInterval(movingAlbumAnimation, 10);
let intervalsStatus = false;

let albumContent = document.getElementById('albums-content');

window.onload = () => {
    clearInterval(checkAlbumLeftInterval);
    clearInterval(movingAlbumAnimationInterval);
    setAlbumsProperties();
    setTitlesStartPosition();
    setTopOfHoveringSelector();
    getOriginalShowsPlaceText();
    createAlbum();
}

window.onscroll = () => {
    console.log(window.scrollY);
    let pageHeight = document.getElementById('body').scrollHeight - window.innerHeight;

    let onePercentage = pageHeight * 0.01;

    document.getElementById('scrolling-length').style.width = (scrollY / onePercentage) + '%';

    if (window.scrollY >= document.getElementById('about').offsetTop)
    {
        document.getElementById('to-top').style.opacity = 1;
        document.getElementById('to-top').style.display = 'block';
    }
    else
    {
        document.getElementById('to-top').style.opacity = 0;
        document.getElementById('to-top').style.display = 'none';
    }

    if (window.innerWidth <= 1024)
    {
        if (window.scrollY < 500 && window.scrollY > 30)
        {
            document.getElementById('headerImgYB').style.top = (window.scrollY / 2) + 'px';
        }
    }
    else if (window.innerWidth > 1024)
    {
        if (window.scrollY < 500 && window.scrollY > 70)
        {
            document.getElementById('headerImgYB').style.top = (window.scrollY / 2) + 'px';
        }   
    }

    if (window.scrollY >= 3800 && window.scrollY <= 5400)
    {
        if (!intervalsStatus)
        {
            startAlbumIntervals();
        }
        
    }
    else if (window.scrollY < 3800 || window.scrollY > 5400)
    {
        stopAlbumIntervals();
    }

    swimInContents();
}   

window.onresize = () => {
    setAlbumsProperties();
    setSmallMenuWidth();
}

document.getElementById('to-top').addEventListener('click', () => {
    window.scrollTo(0, 0);
});

document.getElementById('menu-btn').addEventListener('click', () => {
    openSmallMenu();
});

document.getElementById('sm-menu-close').addEventListener('click', () => {
    closeSmallMenu();
});

document.getElementById('hoveringMenuItem').style.top = (document.getElementsByClassName('sm-menu-list-item')[1].offsetTop + 6) + 'px';

for (const item of document.getElementsByClassName('sm-menu-list-item')) {
    item.onmouseover = () => {
        document.getElementById('hoveringMenuItem').style.top = item.offsetTop + 'px';
        setSelectorSize('text');
    }
    item.onclick = () => {
        closeSmallMenu();
    }
}

for (const child of document.getElementById('sm-menu-list-social-medias').children) {
    child.onmouseover = () => {
        console.log(child);        
        document.getElementById('hoveringMenuItem').style.top = child.offsetTop + 'px';
        document.getElementById('hoveringMenuItem').style.left = child.offsetLeft + 'px';
        setSelectorSize('icon');
    }
}

function swimInContents()
{
    if (window.scrollY >= (document.getElementById('about').offsetTop - 200) && window.scrollY <= (document.getElementById('about').clientHeight + document.getElementById('about').offsetTop + 200))
    {
        document.getElementById('about').children[0].style.animation = 'titleSwimIn 0.8s forwards ease-out';
        document.getElementById('about').children[1].style.animation = 'aboutContentSwimIn 1.2s forwards ease-out';
    }
    if (window.scrollY >= (document.getElementById('shows').offsetTop - 200) && window.scrollY <= (document.getElementById('shows').clientHeight + document.getElementById('shows').offsetTop + 200))
    {
        let shows = document.getElementsByClassName('show');
        document.getElementById('shows').children[0].style.animation = 'titleSwimIn 0.8s forwards ease-out';
        for (let i = 0; i < shows.length; i++) 
        {
            shows[i].style.animation = 'swimInShow 0.5s forwards ease-out';
            shows[i].style.animationDelay = 0.1 * i + 's';
        }
    }
    if (window.scrollY >= (document.getElementById('listen-to-us').offsetTop - 200) && window.scrollY <= (document.getElementById('listen-to-us').clientHeight + document.getElementById('listen-to-us').offsetTop + 200))
    {
        let platforms = document.getElementsByClassName('platform');
        document.getElementById('listen-to-us').children[0].style.animation = 'titleSwimIn 0.8s forwards ease-out';
        for (let i = 0; i < platforms.length; i++)
        {
            platforms[i].style.animation = 'swimUpPlatform 0.6s forwards ease-out';
            platforms[i].style.animationDelay = 0.1 * i + 's';
        }
    }
    if (window.scrollY >= (document.getElementById('albums').offsetTop - 200) && window.scrollY <= (document.getElementById('albums').clientHeight + document.getElementById('albums').offsetTop + 200))
    {
        document.getElementById('albums').children[0].style.animation = 'titleSwimIn 0.8s forwards ease-out';
    }
    if (window.scrollY >= (document.getElementById('contact').offsetTop - 200) && window.scrollY <= (document.getElementById('contact').clientHeight + document.getElementById('contact').offsetTop + 200))
    {
        document.getElementById('contact').children[0].style.animation = 'titleSwimIn 0.8s forwards ease-out';

        let col1 = document.getElementById('content-col-1');
        let col2 = document.getElementById('content-col-2');

        col1.children[0].style.animation = 'swimInCol1Item 0.5s forwards ease-out';
        col1.children[1].style.animation = 'swimInCol1Item 0.5s forwards ease-out';
        col1.children[1].style.animationDelay = 0.3 + 's';
        col1.children[2].style.animation = 'swimInCol1Item 0.5s forwards ease-out';
        col1.children[2].style.animationDelay = 0.6 + 's';
        col1.children[3].style.animation = 'swimInCol1Item 0.5s forwards ease-out';
        col1.children[3].style.animationDelay = 0.9 + 's';

        col2.children[0].style.animation = 'swimInCol2Item 0.5s forwards ease-out';
        col2.children[0].style.animationDelay = 1.2 + 's';
        col2.children[1].style.animation = 'swimInCol2Item 0.5s forwards ease-out';
        col2.children[1].style.animationDelay = 1.5 + 's';
        col2.children[2].style.animation = 'swimInCol2Item 0.5s forwards ease-out';
        col2.children[2].style.animationDelay = 1.8 + 's';
    }
}

function setTitlesStartPosition()
{
    for (const title of document.getElementsByClassName('title')) {
        title.style.left = -(title.clientWidth - 30) + 'px';
    }
}

function setAlbumsProperties()
{
    setAlbumsTop();
}

function getOriginalShowsPlaceText()
{
    for (let i = 0; i < document.getElementsByClassName('place').length; i ++)
    {
        let splitArr = document.getElementsByClassName('place')[i].children[1].innerHTML.split(' ');
        for (let i = 0; i < splitArr.length; i++)
        {
            splitArr[i] = splitArr[i].toLowerCase();
        }
        for (let j = 0; j < splitArr.length; j ++)
        {
            splitArr[j] = splitArr[j].charAt(0).toUpperCase() + splitArr[j].slice(1);    
        }
        let joinArr = splitArr.join(' ');
        document.getElementsByClassName('place')[i].children[1].innerHTML = joinArr;
    }
}

function setSelectorSize(type)
{
    if (window.innerWidth <= 1024 && window.innerWidth > 768)
    {
        switch (type) {
            case 'text':
                document.getElementById('hoveringMenuItem').style.width = 300 + 'px';
                document.getElementById('hoveringMenuItem').style.height = 58 + 'px';
                document.getElementById('hoveringMenuItem').style.padding = '0 20px';
                document.getElementById('hoveringMenuItem').style.left = 0;
                document.getElementById('hoveringMenuItem').style.borderRadius = 0;
                break;
            case 'icon':
                document.getElementById('hoveringMenuItem').style.width = 50 + 'px';
                document.getElementById('hoveringMenuItem').style.height = 50 + 'px';
                document.getElementById('hoveringMenuItem').style.padding = 0;
                document.getElementById('hoveringMenuItem').style.borderRadius = 8 + 'px';
                break;
        }
    }
    else if (window.innerWidth <= 768 && window.innerWidth > 0)
    {
        switch (type) {
            case 'text':
                document.getElementById('hoveringMenuItem').style.width = 100 + '%';
                document.getElementById('hoveringMenuItem').style.height = 58 + 'px';
                document.getElementById('hoveringMenuItem').style.padding = '0 20px';
                document.getElementById('hoveringMenuItem').style.left = 0;
                document.getElementById('hoveringMenuItem').style.borderRadius = 0;
                break;
            case 'icon':
                document.getElementById('hoveringMenuItem').style.width = 50 + 'px';
                document.getElementById('hoveringMenuItem').style.height = 50 + 'px';
                document.getElementById('hoveringMenuItem').style.padding = 0;
                document.getElementById('hoveringMenuItem').style.borderRadius = 8 + 'px';
                break;
        }
    }
}

function openSmallMenu()
{
    let smMenu = document.getElementById('sm-menu-list');
    if (window.innerWidth <= 1024 && window.innerWidth > 768)
    {
        smMenu.style.width = 300 + 'px';
        smMenu.style.padding = '30px 20px';
        document.getElementById('hoveringMenuItem').style.width = 300 + 'px';
        document.getElementById('hoveringMenuItem').style.padding = '0 20px';
    }
    else if (window.innerWidth <= 768)
    {
        smMenu.style.width = 80 + '%';
        smMenu.style.padding = '30px 10%';
        document.getElementById('hoveringMenuItem').style.width = 100 + '%';
        document.getElementById('hoveringMenuItem').style.padding = '0 20px';
    }
    setTimeout(() => {
        setTopOfHoveringSelector();
    }, 300);
}

function closeSmallMenu()
{
    document.getElementById('sm-menu-list').style.width = 0;
    document.getElementById('sm-menu-list').style.padding = '30px 0';
    document.getElementById('hoveringMenuItem').style.padding = 0;
    document.getElementById('hoveringMenuItem').style.width = 0;
}

function setSmallMenuWidth()
{
    if (document.getElementById('sm-menu-list').offsetWidth !== 0)
    {
        openSmallMenu();
    }
}

function setTopOfHoveringSelector()
{
    document.getElementById('hoveringMenuItem').style.top = (document.getElementsByClassName('sm-menu-list-item')[0].offsetTop) + 'px';
}

function setSmallMenuSelector()
{
    let smallMenuItems = document.getElementsByClassName('sm-menu-list-item');
    for (const item of smallMenuItems) {
        item.onblur = () => {
            document.getElementById('hoveringMenuItem').style.top = item.offsetTop + 'px';
        }
    }
}

function setSmallAlbumContentWidth()
{
    let albums = document.getElementsByClassName('album');
    document.documentElement.style.setProperty('--smallAlbumContentWidth', (((albums.length + 1) * 300) + ((albums.length + 1)* (40 * 2))) + 'px');
    console.log(albums.length);
}

/** Album functions */

let albumIndex = 0;

const albumTitles = [
    'Another Side', 
    'Move', 
    'Soulful',
    'Horizon',
    'Renaissance',
    'Ibuki',
    'Hishou'
];

const albumCoverImages = [
    'img/albums/anotherside.jpg', 
    'img/albums/move.jpg', 
    'img/albums/soulful.jpg',
    'img/albums/horizon.jpg',
    'img/albums/renaissance.jpg',
    'img/albums/ibuki.jpg',
    'img/albums/hishou.jpg'
];

const albumTracks = [
    ['Yume', 'Change', 'Storm', 'Moyuru (Sprouting)', 'Parallel Feelings', 'Intelligentactile 101', 'Centrifugal Focus', 'Kodo (Inside The Sun Remix)', 'Cherry Blossoms in Winter', 'Rising (Complete Mix)', 'Not Like Me', 'Le aquile non volano a stormi', 'Labyrinth ("Modern" Second Movement)', 'Saiun'],
    ['Wakimizu', 'Koishi', 'Tenpu', 'Tsugaru Jongara Bushi', 'Ibuki See', 'Tsugaru Oharabushi', 'Tsugaru jonkarabushi kakeai kyokuhiki'],
    ['Madrugada', 'A Hill with No Name - Namonaki Oka', 'Kuroda Bushi', 'Blooming', 'Labyrinth', 'Beyond the Deep Sea - Fukaki Umi No Kanata'],
    ['Nemure', 'Decollage', 'Rite of Harmony', 'Genkyou', 'Fusion', 'Regalia', 'Horizon'],
    ['Omoide No Kaze', 'Lullaby of Takeda', 'Nikata', 'Kodo', 'Sougetsu', 'Tanto Bushi', 'Oboro Zukiyo', 'Sistina', 'Indigo'],
    ['Tsugaru Aiyabushi', 'Tsugaru Yosarebushi', 'Jonkarabushi kakeai kyokuhiki (ibuki version)', 'Tsugaru Oharabushi', 'Modern', 'Ibuki'],
    ['Modern (Hishou version)', 'Ibuki (Hishou version)', 'Tsugaru Aiya Bushi (Hishou version)', 'Prostlude Hishou', 'Tsugaru Jongara Bushi (Hishou version)', 'Dual', 'Ringo Bushi', 'Time of Sand', 'Ajigasawa Jinku', 'Panorama', 'Tsugaru Yosare Bushi (Hishou version)', 'Prelude Hishou', 'Yasaburou Bushi', 'Kodo (Hishou versio)']
];

function createAlbum()
{
    let albumsContent = document.getElementById('albums-content');

    let album = document.createElement('article');
    album.className = 'album';
    if (albumContent.children.length > 0)
    {
        album.style.left = (albumContent.children[albumContent.children.length - 1].offsetLeft + 450) + 'px';
    }
    else
    {
        album.style.left = (window.innerWidth + 350) + 'px';
    }

    let coverImageDiv = document.createElement('div');
    coverImageDiv.className = 'cover-image';

    let coverImage = document.createElement('img');
    coverImage.src = albumCoverImages[albumIndex];
    coverImage.alt = "Yoshida-kyodai " + albumTitles[albumIndex] + " album's cover image";

    coverImageDiv.appendChild(coverImage);

    album.appendChild(coverImageDiv);

    let details = document.createElement('div');
    details.className = 'details';

    let header = document.createElement('div');
    header.className = 'header';

    let title = document.createElement('h3');
    title.innerHTML = albumTitles[albumIndex];

    let demoButton = document.createElement('button');
    demoButton.innerHTML = '<i class="icon fa-solid fa-play"></i> demo';

    header.appendChild(title);
    header.appendChild(demoButton);

    let body = document.createElement('div');
    body.className = 'body';

    let tracks = document.createElement('ul');
    tracks.className = 'tracks';

    for (const item of albumTracks[albumIndex]) {
        let track = document.createElement('li');
        track.className = 'track';
        track.innerHTML = item;
        tracks.appendChild(track);
    }
    
    body.appendChild(tracks);

    details.appendChild(header);

    details.appendChild(body);

    album.appendChild(details);

    albumsContent.appendChild(album);

    albumIndex++;

    if (albumIndex >= albumTitles.length)
    {
        albumIndex = 0;
    }

    setAlbumMouseEvents();
}

function setAlbumMouseEvents()
{
    for (const child of albumContent.children) {
        child.onmouseover = () => {
            stopAlbumIntervals();
        }
        child.onmouseout = () => {
            startAlbumIntervals();
        }
    }
}

function movingAlbumAnimation()
{
    if (albumContent.children.length > 0)
    {
        for (const child of albumContent.children) {
            child.style.left = (child.offsetLeft - 1) + 'px';
        }
    }
}

function checkAlbumLeft()
{
    if (albumContent.children.length > 0)
    {
        if (albumContent.children[albumContent.children.length - 1].getBoundingClientRect().left < (window.innerWidth + 220))
        {
            createAlbum();
        }
        for (let i = 0; i < albumContent.children.length; i++)
        {
            if (albumContent.children[i].getBoundingClientRect().left < -500)
            {
                albumContent.children[i].remove();
            }
        }
    }
}

function setAlbumsTop()
{
    document.documentElement.style.setProperty('--albumsTop', (document.getElementById('albums').offsetTop + 400) + 'px')
}

function startAlbumIntervals()
{
    if (!intervalsStatus)
    {
        checkAlbumLeftInterval = setInterval(checkAlbumLeft, 10);
        movingAlbumAnimationInterval = setInterval(movingAlbumAnimation, 10);
    }
    intervalsStatus = true;
}

function stopAlbumIntervals()
{
    intervalsStatus = false;
    clearInterval(checkAlbumLeftInterval);
    clearInterval(movingAlbumAnimationInterval);
}

