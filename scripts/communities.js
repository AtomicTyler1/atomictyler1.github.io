function renderCommunitiesPage() {
    if (!COMMUNITIES_DATA || COMMUNITIES_DATA.length === 0) {
        contentDiv.innerHTML = `
            <div class="page-transition text-center py-12">
                <p class="text-xl italic text-[--color-subtle]">Syncing Live Discord Communities...</p>
            </div>`;
        return;
    }

    const communityCardTemplate = (community) => {
        const isFavourite = community.favourite ? '<span class="absolute top-4 left-4 text-yellow-500"><i data-lucide="star" class="w-5 h-5 fill-current"></i></span>' : '';

        const websiteIcon = community.website ? `
            <a href="${community.website}" target="_blank" class="absolute top-4 right-4 text-[--color-accent] hover:text-[--color-text-main] transition duration-300 z-10" aria-label="Visit Community Website">
                <i data-lucide="globe" class="w-5 h-5"></i>
            </a>
        ` : '';

        const displayMembers = typeof community.members === 'number' ? formatNumber(community.members) : community.members;

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
                    <p>Members: ${displayMembers}</p>
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