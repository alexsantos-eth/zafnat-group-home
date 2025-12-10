const HomeView = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            
            >
                <source src="/images/home/background.mp4" type="video/mp4" />
            </video>
        </div>
    );
}

export default HomeView;