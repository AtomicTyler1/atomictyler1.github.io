const COMMUNITIES_DATA = [
    { id: 'peak-modding', display: 'PEAK Modding Community', join: '19 April 2025', status: 'Server Owner', invite: 'discord.gg/SAw86z24rB', favourite: true, members: '6,000+', image: 'https://cdn.discordapp.com/icons/1363179626435707082/c72c47d04c782b0a405b024fae6335a8.webp', description: 'The official modding community, partnered with Thunderstore for PEAK.', website: 'https://peakmodding.github.io/' },
    { id: 'peak', display: 'Official PEAK Discord', join: '17 June 2025', status: 'Moderator', invite: 'discord.gg/peakgame', favourite: true, members: '478,000+', image: 'https://cdn.discordapp.com/icons/1368870708335083650/9547ab960b4e3337ae6f608a63aab45e.webp', description: 'The official discord for PEAK by Landcrab (Landfall & Aggro Crab)', website: 'https://peakpeakpeak.com/' },
    { id: 'lethal-company-modding', display: 'Lethal Company Modding', join: '6 August 2024', status: 'Senior Server Staff', invite: 'discord.gg/XeyYqRdRGC', favourite: true, members: '38,000+', image: 'https://cdn.discordapp.com/icons/1168655651455639582/a_a1f853e2ebb09bbaa428648109eca048.webp', description: 'The first modding community I joined and modded in!', website: 'https://lethal.wiki/' },
    { id: 'atomics-lab', display: 'Atomic\'s Lab', join: '12 September 2025', status: 'Server Owner', invite: 'discord.gg/PGf9aa9n2t', favourite: false, members: '13+', image: 'https://cdn.discordapp.com/icons/1416132317243510906/6ad870513c1985845888086dff36707c.webp', description: 'A hub for my personal projects and developments.', website: 'https://atomictyler.dev/' },
    { id: 'content-warning-mods', display: 'Content Warning Mods', join: '19 September 2024', status: 'Modder', invite: 'discord.gg/yeGDSm4gFq', favourite: false, members: '14,900+', image: 'https://cdn.discordapp.com/icons/1224455971057958954/bd4d57e5aae0cc746e643a9b427b2a4e.webp', description: 'Official community for Content Warning Mods, by Landfall.' },
    { id: 'repo', display: 'R.E.P.O. Modding Community', join: '17 April 2025', status: 'Moderator', invite: 'discord.gg/vPJtKhYAFe', favourite: false, members: '15,200+', image: 'https://cdn.discordapp.com/icons/1344557689979670578/55ee5d529af2ce487eb9b1d0b6d9d49f.webp', description: 'Modding Community for R.E.P.O.' },
    { id: 'thunderstore', display: 'Thunderstore', join: '12 November 2024', status: 'Community Moderator', invite: 'discord.gg/UWpWhjZken', favourite: false, members: '11,200+', image: 'https://cdn.discordapp.com/icons/809128887366975518/b3e3ff21e74318f6c1fc734286e8ac76.webp', description: 'Popular mod hosting site.', website: 'https://thunderstore.io/' },
    { id: 'yapyap', display: 'YAPYAP Modding', join: '4 Februrary 2026', status: 'Server Owner', invite: 'discord.gg/kzKBmD8HrB', favourite: false, members: '50+', image: 'https://cdn.discordapp.com/icons/1468700116104908884/77fdc52c94bb988b57d420a74214022a.webp', description: 'A small modding community for YAPYAP.', website: 'https://store.steampowered.com/app/3834090/YAPYAP/' },
];

function renderCommunitiesPage() {
    const communityCardTemplate = (community) => {
        const isFavourite = community.favourite ? '<span class="absolute top-4 left-4 text-yellow-500"><i data-lucide="star" class="w-5 h-5 fill-current"></i></span>' : '';

        const websiteIcon = community.website ? `
            <a href="${community.website}" target="_blank" class="absolute top-4 right-4 text-[--color-accent] hover:text-[--color-text-main] transition duration-300 z-10" aria-label="Visit Community Website">
                <i data-lucide="globe" class="w-5 h-5"></i>
            </a>
        ` : '';

        return `
            <div class="panel-block p-6 flex flex-col justify-between h-full relative overflow-hidden">
                ${isFavourite}
                ${websiteIcon}
                
                <div class="flex items-start space-x-4 mb-4">
                    <img src="${community.image}" alt="${community.display} icon" class="w-16 h-16 rounded-xl shadow-md flex-shrink-0">
                    <div>
                        <h3 class="text-xl font-bold text-[--color-text-main]">${community.display}</h3>
                        <p class="text-sm text-[--color-accent] font-semibold">${community.status}</p>
                    </div>
                </div>
                
                <p class="text-sm text-[--color-text-main] mb-4 flex-grow">${community.description}</p>
                
                <div class="text-xs text-[--color-subtle] mb-4 border-t border-[--color-border] pt-3">
                    <p>Joined: ${community.join}</p>
                    <p>Members: ${community.members}</p>
                </div>

                <button onclick="window.open('https://${community.invite}', '_blank')" class="mt-4 w-full bg-[--color-accent] text-white py-2 rounded-lg font-bold hover:opacity-80 transition duration-300 shadow-md shadow-[--color-shadow-base]">
                    Join Discord
                </button>
            </div>
        `;
    };

    const favouriteCommunities = COMMUNITIES_DATA.filter(c => c.favourite).map(communityCardTemplate).join('');
    const otherCommunities = COMMUNITIES_DATA.filter(c => !c.favourite).map(communityCardTemplate).join('');

    contentDiv.innerHTML = `
        <div class="page-transition">
            <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-8 border-b-2 border-[--color-border] pb-2">Favourite Communities</h2>
            <p class="text-lg text-[--color-subtle] mb-8">These are the communities I am most actively involved in, featuring some of my main modding work.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                ${favouriteCommunities}
            </div>

            <h3 class="text-3xl font-extrabold text-[--color-text-main] mb-6 border-b border-[--color-border] pb-2 mt-12">Other Communities</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${otherCommunities}
            </div>
        </div>
    `;
    lucide.createIcons();
}