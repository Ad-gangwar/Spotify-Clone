import React from 'react'
const focusCardsData = [
    {
        title: "Peaceful Piano",
        description: "Relax and indulge with beautiful piano pieces.",
        imgUrl: "https://i.scdn.co/image/ab67706c0000da84411d41833f74a305492867ee",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music.",
        imgUrl: "https://i.scdn.co/image/ab67706f00000002d6d48b11fd3b11da654c3519",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in background.",
        imgUrl: "https://pianoramix.com/assets/media/396-spotify-instrumental-study-300x300r.jpg",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats.",
        imgUrl: "https://i.scdn.co/image/ab67706f00000002724554ed6bed6f051d9b0bfc",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house.",
        imgUrl: "https://i.scdn.co/image/ab67706f0000000296e08a91ef3c7a6e7bfaa9a6",
    },
];

const spotifyPlaylistsCardData = [
    {
        title: "Today's Top Hits",
        description: "The weekend is on top of the Hottest 50!",
        imgUrl: "https://i.scdn.co/image/ab67706f00000002ad9bf84d23e7d1b07514dd4c",
    },
    {
        title: "RapCaviar",
        description: "Music from Lil Uzi Vert, Drake and Moneybagg yo.",
        imgUrl: "https://i.scdn.co/image/ab67706c0000da8406697cc7c96fa0caae2c999c",
    },
    {
        title: "All Out 2010s",
        description: "The biggest songs of the 2010s.",
        imgUrl: "https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1",
    },
    {
        title: "Rock Classics",
        description: "Rock legends and epic songs that continue to...",
        imgUrl: "https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32daaf7e",
    },
    {
        title: "Chill hits",
        description: "Kick nack to the best new and best chill hits.",
        imgUrl: "https://i.scdn.co/image/ab67706f00000002b60db5d1bcdd9c4fd1ebcffe",
    },
];
const soundOfIndiaCardData = [
    {
        title: "The sound of Mumbai",
        description: "The sound that unites, defines and distinguish.....",
        imgUrl: "https://i.scdn.co/image/ab67706c0000da8436ea3a15c04a4b0821958ceb",
    },
    {
        title: "The sound of Bangalore",
        description: "The sound that unites, defines and distinguish.....",
        imgUrl: "https://i.scdn.co/image/ab67706c0000da84d8f01d1da427744c3c74172d",
    },
    {
        title: "The sound of Delhi",
        description: "The sound that unites, defines and distinguish.....",
        imgUrl: "https://i.scdn.co/image/ab67706c0000da84fdad3548d41af616a7e8d64c",
    },
    {
        title: "The sound of Kolkata",
        description: "The sound that unites, defines and distinguish......",
        imgUrl: "https://i.scdn.co/image/ab67706c0000da84ca51e0b1b2526295415ea0f7",
    },
    {
        title: "The sound of Chennai",
        description: "The sound that unites, defines and distinguish.....",
        imgUrl: "https://i.scdn.co/image/ab67706c0000da84735ff3d91fd7bcc7e854364d",
    },
];

export default function Cards() {
    return (
        <div>
            <PlaylistView
                titleText="Focus"
                cardsData={focusCardsData}
            />
            <PlaylistView
                titleText="Spotify Playlists"
                cardsData={spotifyPlaylistsCardData}
            />
            <PlaylistView
                titleText="Sound of India"
                cardsData={soundOfIndiaCardData}
            />
        </div>
    )
}

const PlaylistView = ({ titleText, cardsData }) => {
    return (
        <div>
            <h2 className='text-white m-4'>{titleText}</h2>
            <div className='d-flex flex-wrap justify-content-evenly'>
                {cardsData.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            title={item.title}
                            description={item.description}
                            imgUrl={item.imgUrl}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const Card = ({ title, description, imgUrl }) => {
    return (
        <div className="card m-2 mobile-card" style={{ width: "12rem", height: "18rem", backgroundColor: "#272525" }}>
            <img src={imgUrl} className="card-img-top p-3 pb-1" alt="..." />
            <div className="card-body">
                <div className="card-title text-light iconText">{title.length >= 19 ? title.slice(0, 17) + ".." : title}</div>
                <p className="card-text" style={{ color: "#b0afaf", fontSize: "0.9rem" }}>
                    {description.length >= 45 ? description.slice(0, 45) + ".." : description}
                </p>
            </div>
        </div>
    )
}
