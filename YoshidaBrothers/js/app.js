window.onload = () => {
    setAlbumsProperties();
    setTopOfHoveringSelector();
    getOriginalShowsPlaceText();
}

window.onscroll = () => {

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
}

for (const child of document.getElementById('sm-menu-list-social-medias').children) {
    child.onmouseover = () => {
        console.log(child);        
        document.getElementById('hoveringMenuItem').style.top = child.offsetTop + 'px';
        document.getElementById('hoveringMenuItem').style.left = child.offsetLeft + 'px';
        setSelectorSize('icon');
    }
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

function setAlbumsProperties()
{
    albumStartPosition();
    setAlbumsTop();
    setAlbumAnimations();
}

function setAlbumsTop()
{
    if (window.innerWidth > 1200)
    {
        document.documentElement.style.setProperty('--albumTop', (document.getElementById('albums').offsetTop + 350) + 'px');
    }
    else if (window.innerWidth <= 1200)
    {
        document.documentElement.style.setProperty('--albumTop', (document.getElementById('albums').offsetTop + 400) + 'px');
    }
}

function setSmallAlbumContentWidth()
{
    let albums = document.getElementsByClassName('album');
    document.documentElement.style.setProperty('--smallAlbumContentWidth', (((albums.length + 1) * 300) + ((albums.length + 1)* (40 * 2))) + 'px');
    console.log(albums.length);
}

function setAlbumAnimations()
{
    let albums = document.getElementsByClassName('album');
        for (let i = 0; i < albums.length; i++)
        {
            albums[i].style.animation = 'move '+ 15 +'s infinite linear';
            if (window.innerWidth < 768)
            {
                albums[i].style.animationDelay = (i * 6) + 's';
            }
            else
            {
                albums[i].style.animationDelay = (i * 5) + 's';
            }
        }
        for (const album of albums) {
            album.onmouseover = () => {
                stopAllAlbumAnimation();
            }
            album.onmouseout = () => {
                startAllAlbumAnimation();
            }
        }
}

function startAllAlbumAnimation()
{
    let albums = document.getElementsByClassName('album');
    for (const album of albums) {
        album.style.animationPlayState = 'running';
    }
}

function stopAllAlbumAnimation()
{
    let albums = document.getElementsByClassName('album');
    for (const album of albums) {
        album.style.animationPlayState = 'paused';
    }
}

function albumStartPosition()
{
    let albumContentWidth = document.getElementById('albums').children[1].clientWidth;
    document.documentElement.style.setProperty('--startLeft', parseInt(albumContentWidth) + 'px');
}