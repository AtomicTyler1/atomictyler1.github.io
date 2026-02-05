const COMMUNITIES_DATA = [
    { id: 'peak-modding', display: 'PEAK Modding Community', join: '19 April 2025', status: 'Server Owner', invite: 'discord.gg/SAw86z24rB', favourite: true, members: '6,000+', image: 'https://cdn.discordapp.com/icons/1363179626435707082/c72c47d04c782b0a405b024fae6335a8.webp', description: 'The official modding community, partnered with Thunderstore for PEAK.', website: 'https://peakmodding.github.io/' },
    { id: 'peak', display: 'Official PEAK Discord', join: '17 June 2025', status: 'Moderator', invite: 'discord.gg/peakgame', favourite: true, members: '478,000+', image: 'https://cdn.discordapp.com/icons/1368870708335083650/9547ab960b4e3337ae6f608a63aab45e.webp', description: 'The official discord for PEAK by Landcrab (Landfall & Aggro Crab)', website: 'https://peakpeakpeak.com/' },
    { id: 'lethal-company-modding', display: 'Lethal Company Modding', join: '6 August 2024', status: 'Moderator', invite: 'discord.gg/XeyYqRdRGC', favourite: true, members: '38,000+', image: 'https://cdn.discordapp.com/icons/1168655651455639582/a_a1f853e2ebb09bbaa428648109eca048.webp', description: 'The first modding community I joined and modded in!', website: 'https://lethal.wiki/' },
    { id: 'atomics-lab', display: 'Atomic\'s Lab', join: '12 September 2025', status: 'Server Owner', invite: 'discord.gg/PGf9aa9n2t', favourite: false, members: '13+', image: 'https://cdn.discordapp.com/icons/1416132317243510906/6ad870513c1985845888086dff36707c.webp', description: 'A hub for my personal projects and developments.', website: 'https://atomictyler.dev/' },
    { id: 'content-warning-mods', display: 'Content Warning Mods', join: '19 September 2024', status: 'Modder', invite: 'discord.gg/yeGDSm4gFq', favourite: false, members: '14,900+', image: 'https://cdn.discordapp.com/icons/1224455971057958954/bd4d57e5aae0cc746e643a9b427b2a4e.webp', description: 'Official community for Content Warning Mods, by Landfall.' },
    { id: 'repo', display: 'R.E.P.O. Modding Community', join: '17 April 2025', status: 'Moderator', invite: 'discord.gg/vPJtKhYAFe', favourite: false, members: '15,200+', image: 'https://cdn.discordapp.com/icons/1344557689979670578/55ee5d529af2ce487eb9b1d0b6d9d49f.webp', description: 'Modding Community for R.E.P.O.' },
    { id: 'thunderstore', display: 'Thunderstore', join: '12 November 2024', status: 'Community Moderator', invite: 'discord.gg/UWpWhjZken', favourite: false, members: '11,200+', image: 'https://cdn.discordapp.com/icons/809128887366975518/b3e3ff21e74318f6c1fc734286e8ac76.webp', description: 'Popular mod hosting site.', website: 'https://thunderstore.io/' },
    { id: 'yapyap', display: 'YAPYAP Modding', join: '4 Februrary 2026', status: 'Server Owner', invite: 'https://discord.gg/kzKBmD8HrB', favourite: false, members: '24', image: 'https://cdn.discordapp.com/icons/1468700116104908884/77fdc52c94bb988b57d420a74214022a.webp', description: 'A small modding community for YAPYAP.', website: 'https://store.steampowered.com/app/3834090/YAPYAP/' },
];

const PLATFORM_SVGS = {
    thunderstore: `<svg class="w-12 h-12" viewBox="0 0 1000 896" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.4223 496.845L209.485 838.17L300 650.202L200.99 477.966C189.992 458.897 189.992 436.945 200.99 417.779L324.555 202.755C335.561 183.611 354.447 172.666 376.421 172.675H442.857L314.286 462.366H473.143L257.143 881.384L690.941 361.014H557.588L648.593 172.675H808.03H900.762L1000 2.28882e-05H715.868H526.836H298.96C263.138 0.0084323 232.393 17.8324 214.461 48.9346L13.4223 398.9C-4.46781 430.078 -4.48036 465.827 13.4223 496.845ZM313.959 895.833H701.066C736.813 895.833 767.63 878.005 785.612 846.819L986.655 496.836C1004.44 465.827 1004.44 430.078 986.655 398.892L906.26 258.947H707.808L799.079 417.779C809.985 436.961 809.984 458.91 799.049 477.974L675.531 693.049C664.454 712.222 645.555 723.15 623.555 723.15H533.795L471.429 722.446L313.959 895.833Z"></path></svg>`,
    nexus: `<svg height="32" width="32" viewBox="0 0 162 162" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="M44.4,162.5c-0.6,0-1.3,0-1.9-0.1c-1.5-0.2-2.9-0.5-4.5-1c-2.8-0.9-5.2-2.2-6.9-3.2c-3.8-2.2-7.7-4.9-11.8-8.3 c-1.8-1.5-3.6-3.1-5.3-4.7l-1.4-1.4c-1-0.9-1.9-1.9-2.6-3c-1.3-2-2.4-4.6-2.5-8c-0.1-1.1-0.2-2.2-0.2-3.4c0-2.4,0.1-5,0.5-7.5 c0.7-5.2,2.4-9.8,3.7-13.3c0.1-0.3,0.2-0.6,0.3-0.9c-0.4-0.9-0.7-1.9-1.1-2.9C8.9,99.6,7.7,93.8,7.1,88 c-0.6-6.1-0.4-12.3,0.5-18.4c0.2-1.3,0.4-2.6,0.7-3.8C5.9,62.3,2.9,57.3,1,51.5l0-0.1c-0.4-1.2-1.4-4.2-0.8-8 c0.2-1.4,0.5-2.8,1-4.3c0.9-2.8,2.2-5.1,3.2-6.8c2.2-3.8,4.9-7.6,8.2-11.7c1.5-1.8,3-3.6,4.6-5.2l1.4-1.4 c0.7-0.8,1.5-1.5,2.4-2.1c2-1.5,4.8-2.8,8.6-2.9c1.2-0.1,2.5-0.2,3.8-0.2h0.1c2.5,0,5.2,0.2,7.8,0.6c4,0.6,7.6,1.7,10.8,2.9 c2.1-0.9,4.3-1.7,6.6-2.5C64.1,8,69.9,6.8,75.7,6.4C81.8,5.9,88,6.2,93.9,7.2c1.4,0.2,2.8,0.5,4.2,0.8c4.7-3.2,9-5.5,13.5-6.9 l0.1,0c1-0.4,3.2-1.1,6.1-1.1c0.6,0,1.3,0,1.9,0.1c1.5,0.2,2.9,0.5,4.5,1c2.8,0.9,5.2,2.2,6.9,3.2c3.8,2.2,7.7,4.9,11.8,8.3 c1.8,1.5,3.6,3.1,5.3,4.7l1.4,1.4c0.7,0.6,1.4,1.3,1.9,2.1c1.8,2.3,3.2,5.6,3.3,10.2c0.1,1.6,0.1,3.3,0,5 c-0.2,3.7-0.7,7.2-1.6,10.4c-0.7,2.4-1.5,4.8-2.4,7.2c1.8,4.5,3.1,9.1,4,13.8c1.8,9.9,1.6,20.1-0.6,29.9c1.3,1.9,2.5,3.7,3.5,5.5 c1.7,3,3.1,6.1,4.1,9.3c0.4,1.2,1.3,4.2,0.7,8.2c-0.2,1.4-0.6,2.7-1.1,4.2c-1.8,5.1-4.6,9.3-7.1,12.8c-2.7,3.8-5.8,7.5-9,10.9 l-1.2,1.2c-0.7,0.8-1.5,1.5-2.4,2.2c-2,1.5-4.8,2.7-8.6,2.9c-1.2,0.1-2.5,0.2-3.8,0.2h-0.1c-2.7,0-5.4-0.2-8.2-0.7 c-4.5-0.7-8.5-2.1-12.1-3.5c-1.9,0.8-3.9,1.5-5.8,2.1c-5.6,1.7-11.5,2.8-17.4,3.1c-6.1,0.4-12.3-0.1-18.3-1.2 c-0.7-0.1-1.5-0.3-2.2-0.4c-5.2,3.7-9.8,6.1-14.6,7.7l-0.1,0C49.5,161.7,47.3,162.5,44.4,162.5L44.4,162.5z M24.6,134.1l10.6,3.7 c0.9-2.6,1-5.4,0.4-8c0,0.2,0,0.5,0.1,0.7c0,0.3,0.1,0.7,0.1,1.1c-0.1-2-0.8-4.6-2.6-7c-0.7-0.9-1.5-1.7-2.4-2.4l0.5,0.4l0.9,0.9 c-0.8-0.8-1.7-1.6-2.7-2.3L24.6,134.1L24.6,134.1z M123.7,129.4c-0.8,0.8-1.6,1.6-2.3,2.7l11.9,4.6l0-11.1c0,0,0,0,0,0 c-1.1,0-2.2,0.1-3.2,0.4c0.2,0,0.4,0,0.6,0c0.3,0,0.7-0.1,1.1-0.1c-1.8,0.1-4.2,0.7-6.4,2.1c-1.2,0.8-2.2,1.7-3.1,2.9l0.4-0.5 L123.7,129.4L123.7,129.4z M35.8,126.8c0.5,0.4,1,0.8,1.5,1.3c2.6,2.2,5,3.9,7.2,5.2c1.4-0.7,3-1.7,4.7-3 c0.5-0.3,0.9-0.7,1.4-1.1c0.3-0.2,0.5-0.5,0.8-0.7c0.1-0.1,0.3-0.3,0.4-0.4l6.2-6.3l8.4,2.9c0.3,0.1,0.6,0.2,0.8,0.3 c1.8,0.6,3.6,1,5.4,1.4c3.7,0.7,7.6,1,11.4,0.7c3.6-0.2,7.3-0.9,10.7-1.9c1.7-0.5,3.4-1.1,5-1.9c0.8-0.3,1.6-0.7,2.3-1.1 c2-1,4.3-1.6,6.6-1.6c3.6,0,6.3,1.3,7.6,2c0.4,0.2,0.8,0.4,1.3,0.5c2.5,1,5.4,2.2,8,2.6c0.4,0.1,0.9,0.1,1.3,0.2 c1.5-1.7,2.9-3.5,4.2-5.3c0.8-1.1,1.6-2.2,2.3-3.3c-0.1-0.2-0.2-0.4-0.4-0.7c-0.7-1.2-1.5-2.4-2.5-3.9c-0.3-0.5-0.7-0.9-1.1-1.4 c-0.2-0.2-0.3-0.4-0.5-0.6c-4.1-4-5.5-9.7-3.6-15.1c0.1-0.3,0.2-0.6,0.3-0.8c2.3-7.2,2.7-14.9,1.4-22.3c-0.7-3.5-1.7-7-3.2-10.3 c-0.1-0.3-0.3-0.6-0.4-0.9c-3.3-6.1-1.9-11.3-0.7-13.8c0.5-1,0.9-2.1,1.3-3.1c0.8-1.9,1.4-3.9,2-5.7c0.2-0.9,0.4-1.8,0.5-2.9 c-0.5-0.4-1-0.8-1.5-1.3c-2.7-2.2-5-3.9-7.2-5.2c-1.4,0.8-3,1.8-4.8,3c-0.5,0.4-1,0.8-1.5,1.2c-0.1,0.1-0.3,0.2-0.4,0.4 c-2.7,2.6-6.3,4-10,4c-1.8,0-3.5-0.3-5.2-1c-0.4-0.1-0.8-0.3-1.2-0.4c-1.8-0.5-3.6-1-5.5-1.3c-3.7-0.6-7.6-0.8-11.4-0.5 c-3.6,0.3-7.2,1-10.6,2.1c-1.7,0.5-3.3,1.2-4.9,1.9c-0.8,0.3-1.5,0.7-2.3,1.1L59.5,40c-2.1,1.2-4.6,1.8-7,1.8 c-2.2,0-4.4-0.5-6.5-1.5c-0.5-0.2-0.9-0.4-1.4-0.6c-2.4-1-5.3-2.1-7.8-2.4c-0.4-0.1-0.8-0.1-1.1-0.2c-0.4,0.5-0.8,1-1.2,1.4 c-2.2,2.7-3.9,5-5.2,7.3c0.7,1.4,1.7,2.9,2.9,4.7c0.3,0.5,0.7,1,1.1,1.4c0.2,0.3,0.5,0.5,0.7,0.8l5.8,6.1l-2.5,8 c-0.2,0.5-0.3,1-0.5,1.5c-0.5,1.8-0.9,3.7-1.2,5.6c-0.6,3.8-0.7,7.6-0.3,11.5c0.3,3.6,1.1,7.2,2.3,10.6c0.6,1.7,1.3,3.3,2,4.9 c0.1,0.2,0.2,0.4,0.3,0.6c2.1,4.3,2.1,9.1-0.1,13.4c-0.2,0.4-0.4,0.8-0.5,1.2c-0.4,1-0.9,2-1.3,3c-0.8,2.2-1.8,4.8-2.1,7.1 C35.9,126.3,35.8,126.6,35.8,126.8L35.8,126.8z M129.9,38.8c0.8,0.8,1.7,1.6,2.8,2.4l4.9-12.9L127,24.6c-0.9,2.6-1,5.4-0.4,8 c0-0.1,0-0.2,0-0.3c0-0.3,0-0.8,0-1.3v-0.1c0,1.5,0.5,4,2.1,6.4c0.8,1.1,1.7,2.1,2.8,3l-0.5-0.4L129.9,38.8L129.9,38.8z  M29.3,26.3l0,11.1c1.1,0,2.2-0.1,3.2-0.4c-0.2,0-0.4,0-0.6,0c-0.3,0-0.7,0.1-1.1,0.1c1.8-0.1,4.2-0.7,6.4-2.1 c1.2-0.8,2.2-1.7,3.1-2.9l-0.4,0.5l-0.9,1c0.8-0.8,1.6-1.7,2.3-2.7L29.3,26.3L29.3,26.3z"/>
            <path fill="#F97316" d="M56.3,88.4l0.7,28.3l-7-5.7c-7.8,12.7-10.3,25-6.6,34.1l1.3,3.2l-3.2-1.4c-7.3-3.2-13.9-7.7-19.4-13.5 l-0.3-0.3l-0.1-0.5c-0.4-3.5-0.2-7.3,0.7-11.2l0-0.1c1.3-4.9,3.2-9.8,5.6-14.7c1.5-3.1,3.3-6.2,5.3-9.2l-6.1-5L56.3,88.4z"/>
            <path fill="#F97316" d="M105.9,74.1l-0.7-28.3l7,5.7c7.8-12.7,10.3-25,6.6-34.1l-1.3-3.2l3.2,1.4c7.3,3.2,13.9,7.7,19.4,13.5 l0.3,0.3l0.1,0.5c0.4,3.5,0.2,7.3-0.7,11.2l0,0.1c-1.3,4.9-3.2,9.8-5.6,14.7c-1.5,3.1-3.3,6.2-5.3,9.2l6.1,5L105.9,74.1z"/>
            <path fill="#F97316" d="M88.5,105.4l28.3-0.7l-5.7,7c12.7,7.8,25,10.3,34.1,6.6l3.2-1.3l-1.4,3.2c-3.2,7.3-7.7,13.9-13.5,19.4 l-0.3,0.3l-0.5,0.1c-3.5,0.4-7.3,0.2-11.2-0.7l-0.1,0c-4.9-1.3-9.8-3.2-14.7-5.6c-3.1-1.5-6.2-3.3-9.2-5.3l-5,6.1L88.5,105.4z"/>
            <path fill="#F97316" d="M74.1,57.6l-28.3,0.7l5.7-7c-12.7-7.8-25-10.3-34.1-6.6L14.3,46l1.4-3.2c3.2-7.3,7.7-13.9,13.5-19.4 l0.3-0.3L30,23c3.5-0.4,7.3-0.2,11.2,0.7l0.1,0c4.9,1.3,9.8,3.2,14.7,5.6c3.1,1.5,6.2,3.3,9.2,5.3l5-6.1L74.1,57.6z"/>
            <circle fill="#FB923C" cx="81.4" cy="80.8" r="60.5"/>
            <path fill="#F4F4F5" d="M59.3,59.5c-3.5-1.6-6.1-3.2-8.7-5.1c-4-2.8-7.7-5.9-10.8-9.2c-7.6-7.7-11.6-15.6-10.5-22.1L27,25.6 c-5.5,5.8-12.8,16-12.9,20.4c0.1,0.5,0.1,0.5,0.1,0.5c1,3.4,2.6,6.8,4.9,10.1l0,0.1c3,4.8,8.9,12.7,29.9,21.9l-3.7,7l28.3-7.6 L63.5,51.5L59.3,59.5z"/>
            <path fill="#F4F4F5" d="M103.3,103.5c3.5,1.6,6.1,3.2,8.7,5.1c4,2.8,7.7,5.9,10.8,9.2c7.6,7.7,11.6,15.6,10.5,22.1l2.3-2.4 c5.5-5.8,12.8-16,12.9-20.4c-0.1-0.5-0.1-0.5-0.1-0.5c-1-3.4-2.6-6.8-4.9-10.1l0-0.1c-3-4.8-8.9-12.7-29.9-21.9l3.7-7l-28.3,7.6 l10.2,26.2L103.3,103.5z"/>
            <path fill="#F4F4F5" d="M104,59.3c1.6-3.5,3.2-6.1,5.1-8.7c2.8-4,5.9-7.7,9.2-10.8c7.7-7.6,15.6-11.6,22.1-10.5L138,27 c-5.8-5.5-16-12.8-20.4-12.9c-0.5,0.1-0.5,0.1-0.5,0.1c-3.4,1-6.8,2.6-10.1,4.9l-0.1,0c-4.8,3-12.7,8.9-21.9,29.9l-7-3.7 l7.6,28.3L112,63.6L104,59.3z"/>
            <path fill="#F4F4F5" d="M58.2,103.2c-1.6,3.5-3.2,6.1-5.1,8.7c-2.8,4-5.9,7.7-9.2,10.8c-7.7,7.6-15.6,11.6-22.1,10.5l2.4,2.3 c5.8,5.5,16,12.8,20.4,12.9c0.5-0.1,0.5-0.1,0.5-0.1c3.4-1,6.8-2.6,10.1-4.9l0.1,0c4.8-3,12.7-8.9,21.9-29.9l7,3.7l-7.6-28.3 L50.3,98.9L58.2,103.2z"/>
        </g>
        </svg>`,
    steam: `<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M18.102 12.129c0-0 0-0 0-0.001 0-1.564 1.268-2.831 2.831-2.831s2.831 1.268 2.831 2.831c0 1.564-1.267 2.831-2.831 2.831-0 0-0 0-0.001 0h0c-0 0-0 0-0.001 0-1.563 0-2.83-1.267-2.83-2.83 0-0 0-0 0-0.001v0zM24.691 12.135c0-2.081-1.687-3.768-3.768-3.768s-3.768 1.687-3.768 3.768c0 2.081 1.687 3.768 3.768 3.768v0c2.080-0.003 3.765-1.688 3.768-3.767v-0zM10.427 23.76l-1.841-0.762c0.524 1.078 1.611 1.808 2.868 1.808 1.317 0 2.448-0.801 2.93-1.943l0.008-0.021c0.155-0.362 0.246-0.784 0.246-1.226 0-1.757-1.424-3.181-3.181-3.181-0.405 0-0.792 0.076-1.148 0.213l0.022-0.007 1.903 0.787c0.852 0.364 1.439 1.196 1.439 2.164 0 1.296-1.051 2.347-2.347 2.347-0.324 0-0.632-0.066-0.913-0.184l0.015 0.006zM15.974 1.004c-7.857 0.001-14.301 6.046-14.938 13.738l-0.004 0.054 8.038 3.322c0.668-0.462 1.495-0.737 2.387-0.737 0.001 0 0.002 0 0.002 0h-0c0.079 0 0.156 0.005 0.235 0.008l3.575-5.176v-0.074c0.003-3.12 2.533-5.648 5.653-5.648 3.122 0 5.653 2.531 5.653 5.653s-2.531 5.653-5.653 5.653h-0.131l-5.094 3.638c0 0.065 0.005 0.131 0.005 0.199 0 0.001 0 0.002 0 0.003 0 2.342-1.899 4.241-4.241 4.241-2.047 0-3.756-1.451-4.153-3.38l-0.005-0.027-5.755-2.383c1.841 6.345 7.601 10.905 14.425 10.905 8.281 0 14.994-6.713 14.994-14.994s-6.713-14.994-14.994-14.994c-0 0-0.001 0-0.001 0h0z"></path></svg>`
};

let MOD_STATS = { total_downloads: 0, total_ratings: 0, last_checked: 0 };
let ALL_MODS = [];
let GITHUB_REPOS = [];

const GIST_API_URL = 'https://api.github.com/gists/913a40238b453d557cb1073fd4c05a83';
const GIST_FILE_NAME = 'prev.json';
const GITHUB_API_URL = 'https://api.github.com/users/AtomicTyler1/repos';

const CACHE_KEY_MODS = 'atomic_mod_data_cache_v3';
const CACHE_KEY_GITHUB = 'atomic_github_repos_cache_v3';
const CACHE_KEY_THEME = 'atomic_theme_preference_v3';
const CACHE_EXPIRY_MS = 3600000;
const MOD_CACHE_EXPIRY_MS = 3600000 * 4;

let CURRENT_SORT = { by: 'downloads', order: 'desc' };
let CURRENT_FILTER = { community: 'All', platform: 'All' };

const DEFAULT_CLA_STEP = { r: 208, g: 163, b: 232, a: 1, ms: 1000 };

const CLA_PRESETS = {
    'Default Pulse': [
        { r: 208, g: 163, b: 232, a: 1, ms: 1500 },
        { r: 27, g: 128, b: 130, a: 1, ms: 500 },
        { r: 228, g: 33, b: 33, a: 1, ms: 1500 }
    ],
    'Soft Glow': [
        { r: 255, g: 182, b: 193, a: 0.7, ms: 2000 },
        { r: 255, g: 192, b: 203, a: 0.7, ms: 2000 }
    ],
    'Cool Breeze': [
        { r: 135, g: 206, b: 250, a: 1, ms: 1500 },
        { r: 173, g: 216, b: 230, a: 1, ms: 1500 }
    ],
    'Sunset Fade': [
        { r: 255, g: 94, b: 77, a: 1, ms: 2000 },
        { r: 255, g: 165, b: 0, a: 1, ms: 2000 },
        { r: 255, g: 223, b: 186, a: 1, ms: 2000 }
    ],
    'Emergency Strobe': [
        { r: 255, g: 0, b: 0, a: 1, ms: 100 },
        { r: 0, g: 0, b: 255, a: 1, ms: 100 },
        { r: 255, g: 0, b: 0, a: 1, ms: 100 },
        { r: 0, g: 0, b: 255, a: 0, ms: 100 }
    ]
};

let CLA_STATE = {
    steps: CLA_PRESETS['Default Pulse'],
    currentStepIndex: 0,
    animationTimeout: null,
    isPlaying: false,
};

const APP_STATE = {
    currentPage: 'home',
    isMobileMenuOpen: false,
};

const contentDiv = document.getElementById('content');
const appContainer = document.getElementById('app');

const formatNumber = (num) => new Intl.NumberFormat('en-US').format(num);

function initializeTheme() {
    const savedTheme = localStorage.getItem(CACHE_KEY_THEME);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    updateThemeIcons();
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem(CACHE_KEY_THEME, isDark ? 'dark' : 'light');
    updateThemeIcons();
}

function updateThemeIcons() {
    const isDark = document.body.classList.contains('dark');
    document.querySelectorAll('.theme-icon-light').forEach(icon => {
        icon.classList.toggle('hidden', isDark);
    });
    document.querySelectorAll('.theme-icon-dark').forEach(icon => {
        icon.classList.toggle('hidden', !isDark);
    });
    lucide.createIcons();
}

function toggleMobileMenu() {
    APP_STATE.isMobileMenuOpen = !APP_STATE.isMobileMenuOpen;
    const menuEl = document.getElementById('mobile-menu');

    if (APP_STATE.isMobileMenuOpen) {
        menuEl.classList.remove('hidden');
        setTimeout(() => {
            menuEl.classList.replace('bottom-0', 'bottom-50')
            menuEl.classList.remove('translate-y-full');
        }, 10);
    } else {
        menuEl.classList.add('translate-y-full');
        menuEl.classList.replace('bottom-50', 'bottom-0')
        setTimeout(() => {
            menuEl.classList.add('hidden');
        }, 300);
    }

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const iconElement = mobileMenuButton ? mobileMenuButton.querySelector('i') : null;

    if (iconElement) {
        iconElement.setAttribute('data-lucide', APP_STATE.isMobileMenuOpen ? 'x' : 'menu');
    }
    lucide.createIcons();
}

function navigate(page) {
    APP_STATE.currentPage = page;

    if (APP_STATE.isMobileMenuOpen) {
        toggleMobileMenu();
    }

    window.location.hash = page;

    document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });

    contentDiv.innerHTML = '';
    switch (page) {
        case 'home':
            renderHomePage();
            break;
        case 'communities':
            renderCommunitiesPage();
            break;
        case 'projects':
            renderProjectsPage();
            break;
        case 'tools':
            renderToolsPage();
            break;
        case 'cla':
            renderClaPage();
            break;
        case 'leveling':
            renderLevelingPage();
            break;
        case 'peakPresets':
            renderPeakPresetsPage();
            break;
        default:
            renderHomePage();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showMessage(id, message, colorClass) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = message;
        el.className = `p-3 rounded-lg text-sm font-semibold mt-4 text-center ${colorClass}`;
        el.style.opacity = 1;
        setTimeout(() => {
            el.style.opacity = 0;
            el.textContent = '';
            el.className = `text-center transition-opacity duration-500`;
        }, 4000);
    }
}

async function fetchModData() {
    try {
        const response = await fetch(GIST_API_URL);
        const gist = await response.json();

        if (!gist.files || !gist.files[GIST_FILE_NAME]) {
            console.error("prev.json not found in Gist");
            return;
        }

        const fileContent = JSON.parse(gist.files[GIST_FILE_NAME].content);

        MOD_STATS = {
            total_downloads: fileContent.total_downloads || 0,
            total_ratings: fileContent.total_ratings || 0,
            last_checked: fileContent.last_checked || 0
        };

        ALL_MODS = Object.entries(fileContent)
            .filter(([k, v]) => v && v.downloads !== undefined)
            .map(([key, modData]) => {
                const isSteam = modData.platform === 'Steam';
                
                return {
                    name: key,
                    author: isSteam ? "Atomic();" : "AtomicStudio",
                    ...modData
                };
            });

        console.log("Successfully loaded", ALL_MODS.length, "mods from Gist");
        localStorage.setItem(CACHE_KEY_MODS, JSON.stringify({
            data: { mods: ALL_MODS, stats: MOD_STATS },
            timestamp: Date.now()
        }));
    } catch (err) {
        console.error("Failed to fetch mod data:", err);
    }
}

async function fetchGithubRepos() {
    const cachedData = localStorage.getItem(CACHE_KEY_GITHUB);
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
            GITHUB_REPOS = data;
            return;
        }
    }

    try {
        const response = await fetch(GITHUB_API_URL);
        const repos = await response.json();

        GITHUB_REPOS = repos
            .filter(repo => !repo.fork && repo.name !== 'AtomicTyler1' && repo.name !== 'AtomicTyler1.github.io')
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

        localStorage.setItem(CACHE_KEY_GITHUB, JSON.stringify({
            data: GITHUB_REPOS,
            timestamp: Date.now()
        }));
    } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
    }
}

function updateHomePageStats() {
    const downloadEl = document.getElementById('total-downloads');
    const ratingEl = document.getElementById('total-ratings');
    const modsEl = document.getElementById('total-mods-count');

    if (downloadEl) downloadEl.textContent = formatNumber(MOD_STATS?.total_downloads ?? 0);
    if (ratingEl) ratingEl.textContent = formatNumber(MOD_STATS?.total_ratings ?? 0);
    if (modsEl) modsEl.textContent = (ALL_MODS?.length ?? 0);

    lucide.createIcons();
}

function refreshDataViews() {
    if (APP_STATE.currentPage === 'home') {
        updateHomePageStats();
    }
    if (APP_STATE.currentPage === 'projects') {
        renderProjectsPage();
    }
}

function renderHomePage() {
    contentDiv.innerHTML = `
        <div class="hero-container page-transition">
            <div class="hero-content">
                <h1 class="text-7xl sm:text-8xl lg:text-9xl font-extrabold text-[--color-text-main] tracking-tighter opacity-90">
                    Atomic<span class="text-[--color-accent] text-12xl">();</span>
                </h1>
                <p class="text-xl sm:text-2xl font-light mt-4 text-[--color-subtle] max-w-2xl mx-auto">
                    The personal hub for my projects, mods, and communities.
                </p>
                
                <div class="mt-12 flex justify-center space-x-6">
                    <a href="#projects" class="bg-[--color-accent] text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-[--color-shadow-base] hover:opacity-90 transition duration-300 transform hover:scale-105">
                        View Projects
                    </a>
                    <a href="#communities" class="bg-gray-700 dark:bg-[--color-background-panel] text-white dark:text-[--color-text-main] font-bold py-3 px-8 rounded-full shadow-lg dark:shadow-md dark:shadow-[--color-subtle]/50 hover:bg-gray-600 dark:hover:bg-[--color-border] transition duration-300 transform hover:scale-105">
                        Join Communities
                    </a>
                </div>
            </div>
        </div>

        <section id="mod-stats" class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-center">
            <div class="panel-block p-6">
                <i data-lucide="download-cloud" class="w-8 h-8 text-[--color-accent] mx-auto mb-3"></i>
                <p class="text-3xl font-bold text-[--color-text-main]" id="total-downloads">...</p>
                <p class="text-sm text-[--color-subtle] uppercase tracking-wider mt-1">Total Downloads</p>
            </div>
            <div class="panel-block p-6">
                <i data-lucide="star" class="w-8 h-8 text-[--color-accent] mx-auto mb-3"></i>
                 <p class="text-3xl font-bold text-[--color-text-main]" id="total-ratings">...</p>
                <p class="text-sm text-[--color-subtle] uppercase tracking-wider mt-1">Total Ratings</p>
            </div>
            <div class="panel-block p-6">
                <i data-lucide="puzzle" class="w-8 h-8 text-[--color-accent] mx-auto mb-3"></i>
                 <p class="text-3xl font-bold text-[--color-text-main]" id="total-mods-count">...</p>
                <p class="text-sm text-[--color-subtle] uppercase tracking-wider mt-1">Mods Available</p>
            </div>
        </section>
        
        <section class="mt-16 text-center">
            <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-4">Online Tools</h2>
            <p class="text-lg text-[--color-subtle] mb-8">Quickly access the online tools I've built to help mod developers.</p>
            <a href="#tools" class="inline-block bg-[--color-subtle]/30 dark:bg-[--color-background-panel] text-[--color-text-main] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[--color-subtle]/50 dark:hover:bg-[--color-border] transition duration-300">
                Explore Tools <i data-lucide="wrench" class="w-5 h-5 inline ml-2"></i>
            </a>
        </section>
    `;
    lucide.createIcons();
    updateHomePageStats();
}

function renderRepoCard(repo) {
    const lastPushed = new Date(repo.pushed_at).toLocaleDateString();
    return `
        <a href="${repo.html_url}" target="_blank" class="panel-block p-6 flex flex-col justify-between">
            <div>
                <div class="flex items-center justify-between">
                    <h3 class="text-xl font-bold text-[--color-accent]">${repo.name}</h3>
                    ${repo.language ? `<span class="text-xs font-mono bg-[--color-subtle]/20 px-2 py-1 rounded-full text-[--color-text-main]">${repo.language}</span>` : ''}
                </div>
                <p class="text-sm text-[--color-text-main] mt-2">${repo.description || 'No description provided.'}</p>
            </div>
            <div class="mt-4 flex justify-between items-center text-sm text-[--color-subtle]">
                <span class="flex items-center">
                    <i data-lucide="star" class="w-4 h-4 mr-1"></i>${repo.stargazers_count}
                </span>
                <span class="flex items-center">
                    <i data-lucide="git-fork" class="w-4 h-4 mr-1"></i>${repo.forks_count}
                </span>
                <span>Updated: ${lastPushed}</span>
            </div>
        </a>
    `;
}

function renderModCard(mod) {
    let isPopular = ``;
    if (mod.popular == "True") {
        isPopular = `
            <div class="absolute top-2 right-2 bg-gradient-to-r from-amber-500/90 to-yellow-500/90 backdrop-blur-sm rounded-full px-2.5 py-1.5 shadow-lg z-10 flex items-center gap-1 border border-yellow-300/30">
                <i data-lucide="flame" class="w-3.5 h-3.5 text-white"></i>
                <span class="text-[11px] font-bold text-white tracking-wide">POPULAR</span>
            </div>
        `;
    }
    
    let platformBadge = '';
    if (mod.platform) {
        const platform = mod.platform.toLowerCase();
        let platformSvg = PLATFORM_SVGS[platform] || PLATFORM_SVGS.thunderstore;
        
        const coloredSvg = platformSvg
            .replace('class="', 'class="w-5 h-5 ')
            .replace('fill="currentColor"', 'fill="currentColor"');
        
        platformBadge = `
            <div class="absolute top-2 left-2 bg-black/70 dark:bg-gray-900/80 backdrop-blur-sm rounded-full p-1.5 shadow-lg z-10 border border-white/10">
                <div class="w-5 h-5 flex items-center justify-center text-white">
                    ${coloredSvg}
                </div>
            </div>
        `;
    }
    
    const platform = mod.platform ? mod.platform.toLowerCase() : 'thunderstore';

    let ratings = mod.ratings || 0;
    if (mod.platform == "Steam") {
        ratings = mod["positive ratings"] || 0;
    }
    
    let iconHtml = `<div class="text-[--color-accent] opacity-50 scale-75">${PLATFORM_SVGS[platform] || PLATFORM_SVGS.thunderstore}</div>`;
    
    if (platform === 'thunderstore' && mod.link) {
        try {
            const urlParts = mod.link.split('/p/')[1].split('/');
            const author = urlParts[0];
            const modName = urlParts[1];
            const version = mod.version || "1.0.0";
            const iconUrl = `https://gcdn.thunderstore.io/live/repository/icons/${author}-${modName}-${version}.png`;
            
            iconHtml = `<img src="${iconUrl}" alt="${mod.name}" class="mod-card-image w-full h-full object-cover" onerror="this.outerHTML='<div class=\\'flex items-center justify-center w-full h-full text-[--color-accent] opacity-50 scale-75\\'>${PLATFORM_SVGS.thunderstore}</div>`; 
        } catch (e) {
            console.warn("Could not parse Thunderstore link for icon", mod.name);
        }
    } else if (mod.icon) {
        iconHtml = `<img src="${mod.icon}" alt="${mod.name}" class="mod-card-image w-full h-full object-cover" onerror="this.outerHTML='<div class=\\'flex items-center justify-center w-full h-full text-[--color-accent] opacity-50 scale-75\\'>${PLATFORM_SVGS[platform] || PLATFORM_SVGS.thunderstore}</div>`;
    }

    return `
        <a href="${mod.link}" target="_blank" class="mod-card panel-block group relative flex flex-col p-0 overflow-hidden transition-all duration-300">
            <div class="mod-card-icon-wrapper aspect-square w-full bg-gradient-to-br from-[--color-subtle]/5 to-[--color-subtle]/15 flex items-center justify-center relative overflow-hidden">
                ${platformBadge}
                ${isPopular}
                ${iconHtml}
            </div>
            <div class="p-4 flex flex-col flex-grow">
                <h4 class="text-base font-bold text-[--color-text-main] line-clamp-2 min-h-[3rem] group-hover:text-[--color-accent] transition-colors leading-tight mb-2">${mod.name}</h4>
                <p class="text-xs text-[--color-subtle] mb-3 font-medium">${mod.community || 'Unknown'} • v${mod.version || '1.0.0'}</p>
                
                <div class="mt-auto pt-3 border-t border-[--color-border] flex items-center justify-between text-sm font-bold">
                    <span class="flex items-center gap-1.5 text-[--color-accent] bg-[--color-accent]/10 px-3 py-1.5 rounded-full">
                        <i data-lucide="download" class="w-4 h-4"></i>
                        <span class="text-xs">${formatNumber(mod.downloads || 0)}</span>
                    </span>
                    <span class="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-full">
                        <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                        <span class="text-xs">${formatNumber(ratings)}</span>
                    </span>
                </div>
            </div>
        </a>
    `;
}

function updateModSort(by) {
    CURRENT_SORT.by = by;
    sortAndFilterMods();
}

function toggleModSortOrder() {
    CURRENT_SORT.order = CURRENT_SORT.order === 'desc' ? 'asc' : 'desc';
    sortAndFilterMods();
}

function updateModFilter(type, value) {
    CURRENT_FILTER[type] = value;
    sortAndFilterMods();
}

function sortAndFilterMods() {
    const allModsArray = ALL_MODS || [];
    const container = document.getElementById('mods-list-container');

    if (!container) return;
    if (allModsArray.length === 0 && (MOD_STATS?.last_checked === 0)) {
        container.innerHTML = '<p class="text-center text-gray-500 italic py-8">Fetching mod data...</p>';
        lucide.createIcons();
        return;
    }

    let filtered = allModsArray.filter(mod => {
        const platformMatch = CURRENT_FILTER.platform === 'All' || mod.platform === CURRENT_FILTER.platform;
        const communityMatch = CURRENT_FILTER.community === 'All' || mod.community === CURRENT_FILTER.community;
        return platformMatch && communityMatch;
    });

    filtered.sort((a, b) => {
        let valA = a[CURRENT_SORT.by] || 0;
        let valB = b[CURRENT_SORT.by] || 0;

        if (CURRENT_SORT.by === 'ratings') {
            valA = a.platform === 'Steam' ? (a['positive ratings'] || 0) : valA;
            valB = b.platform === 'Steam' ? (b['positive ratings'] || 0) : valB;
        }

        if (CURRENT_SORT.by === 'name') {
            valA = a.name.toLowerCase();
            valB = b.name.toLowerCase();
        }

        let comparison = 0;
        if (valA > valB) comparison = 1;
        if (valA < valB) comparison = -1;

        return CURRENT_SORT.order === 'desc' ? comparison * -1 : comparison;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 italic py-8">No mods found matching the current filters.</p>';
    } else {
        container.innerHTML = filtered.map(renderModCard).join('');
    }
    lucide.createIcons();

    const sortBtn = document.getElementById('mod-sort-order-btn');
    if (sortBtn) {
        const iconName = CURRENT_SORT.order === 'desc' ? 'arrow-down' : 'arrow-up';
        sortBtn.innerHTML = `<i data-lucide="${iconName}" class="w-4 h-4 inline mr-1"></i> ${CURRENT_SORT.order === 'desc' ? 'Desc' : 'Asc'}`;
        lucide.createIcons();
    }
}

function renderProjectsPage() {
    const allModsArray = ALL_MODS || [];
    const platforms = ['All', ...new Set(allModsArray.map(m => m.platform).filter(p => p))];

    const communities = ['All', ...new Set(allModsArray.map(m => m.community).filter(c => c))];

    const githubContent = GITHUB_REPOS.length > 0
        ? GITHUB_REPOS.map(renderRepoCard).join('')
        : '<p class="text-center text-gray-500 italic col-span-full py-8">Fetching GitHub repositories...</p>';

    contentDiv.innerHTML = `
        <div class="page-transition">
            <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-8 border-b-2 border-[--color-border] pb-2 mt-16">My Mods (${allModsArray.length} Total)</h2>
            <p class="text-lg text-[--color-subtle] mb-8">All my published mods and their statistics.</p>
            
            <div class="panel-block p-6 mb-8">
                <div class="flex flex-wrap items-center gap-4 mb-6 p-4 border-b border-[--color-border]">
                    <label class="font-semibold text-sm">Sort By:</label>
                    <select id="mod-sort-by" onchange="updateModSort(this.value)" class="p-2 border rounded-lg bg-[--color-background-panel] text-[--color-text-main]">
                        <option value="downloads" ${CURRENT_SORT.by === 'downloads' ? 'selected' : ''}>Downloads</option>
                        <option value="ratings" ${CURRENT_SORT.by === 'ratings' ? 'selected' : ''}>Ratings</option>
                        <option value="name" ${CURRENT_SORT.by === 'name' ? 'selected' : ''}>Name</option>
                    </select>
                    
                    <button onclick="toggleModSortOrder()" class="p-2 bg-[--color-subtle]/30 rounded-lg text-[--color-text-main] hover:bg-[--color-subtle]/50" id="mod-sort-order-btn">
                        <i data-lucide="arrow-down" class="w-4 h-4 inline mr-1"></i> Desc
                    </button>
                    
                    <label class="font-semibold text-sm ml-4">Platform:</label>
                    <select id="mod-filter-platform" onchange="updateModFilter('platform', this.value)" class="p-2 border rounded-lg bg-[--color-background-panel] text-[--color-text-main]">
                        ${platforms.map(p => `<option value="${p}" ${CURRENT_FILTER.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
                    </select>

                    <label class="font-semibold text-sm ml-4">Community:</label>
                    <select id="mod-filter-community" onchange="updateModFilter('community', this.value)" class="p-2 border rounded-lg bg-[--color-background-panel] text-[--color-text-main]">
                        ${communities.map(c => `<option value="${c}" ${CURRENT_FILTER.community === c ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                </div>

                <div id="mods-list-container" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                </div>
            </div>
        </div>
        <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-8 border-b-2 border-[--color-border] pb-2">My Open-Source Code</h2>
        <p class="text-lg text-[--color-subtle] mb-8">A snapshot of my recent activity on GitHub, showcasing my open-source infrastructure and projects.</p>
        <div id="github-repos-container" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            ${githubContent}
        </div> 
    `;

    lucide.createIcons();
    sortAndFilterMods();
}

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

function renderToolsPage() {
    const toolCards = [
        {
            id: 'cla',
            icon: 'wrench',
            title: 'Cozy Lights Animator',
            description: 'A visual editor for generating animation data for the Cozy Lights mod.',
            link: '#cla',
            accent: 'text-pink-500'
        },
        {
            id: 'leveling',
            icon: 'badge-check',
            title: 'Leveling XP Calculator',
            description: 'Calculate XP requirements to get from level A to level B with my mod!',
            link: '#leveling',
            accent: 'text-pink-500'
        },
        { 
            id: 'peakPresets', 
            icon: 'settings', 
            title: 'Peak Presets',
            link: '#peakPresets',
            description: 'Configure custom challenges for the Challenge Creator mod with an easy-to-use editor.' 
        }
    ];

    contentDiv.innerHTML = `
        <div class="page-transition">
            <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-8 border-b-2 border-[--color-border] pb-2">Online Tools</h2>
            <p class="text-lg text-[--color-subtle] mb-8">Handy tools built to simplify the modding experience for developers and users.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${toolCards.map(tool => `
                    <a href="${tool.link}" class="panel-block p-6 flex items-start space-x-4">
                        <i data-lucide="${tool.icon}" class="w-8 h-8 ${tool.accent} flex-shrink-0 mt-1"></i>
                        <div>
                            <h3 class="text-xl font-bold text-[--color-text-main]">${tool.title}</h3>
                            <p class="text-sm text-[--color-subtle] mt-1">${tool.description}</p>
                        </div>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
    lucide.createIcons();
}

let currentChallenge = JSON.parse(localStorage.getItem('peak_preset_cache')) || {
    Name: "", Creators: "", Notes: "", MinAscent: -1, 
    AllowHigherAscents: true, disallowedItems: [], 
    oneTimeUseItems: [], allowedItemsOnly: [],
    Itemless: false, DisableRopeTypes: false,
    alwaysHaveTick: false, noMultiplayer: false,
    minimumPlayers: 1, allowReserveStamina: true,
    noSprinting: false, noJumping: false, noBackpack: false,
    startSkeleton: false, controlLockLeftAndRight_Ground: false, controlLockForwardAndBackward_Ground: false,
    controlLockLeftAndRight_Climb: false, controlLockForwardAndBackward_Climb: false,
};

function savePresetCache() {
    localStorage.setItem('peak_preset_cache', JSON.stringify(currentChallenge));
}

function formatItemNameForWiki(itemName) {
    return itemName.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('_');
}

let manualImageOverrides = {
    "ANTI-ROPE SPOOL": "https://peak.wiki.gg/images/thumb/Anti-Rope_Spool.png/64px-Anti-Rope_Spool.png?ae4d5d",
    "THE BOOK OF BONES": "https://peak.wiki.gg/images/thumb/The_Book_of_Bones.png/64px-The_Book_of_Bones.png?90f081",
    "BUGLE OF FRIENDSHIP": "https://peak.wiki.gg/images/thumb/Bugle_of_Friendship.png/64px-Bugle_of_Friendship.png?ae33da",
    "BUGLE OF FRIENDSHIP": "https://peak.wiki.gg/images/thumb/Bugle_of_Friendship.png/64px-Bugle_of_Friendship.png?ae33da",
    "CURE-ALL": "https://peak.wiki.gg/images/thumb/Cure-All.png/64px-Cure-All.png?de867e",
    "GREEN CLUSTERBERRY": "https://peak.wiki.gg/images/thumb/Clusterberry_Green.png/64px-Clusterberry_Green.png?b366c0",
    "BERRYNANA PEEL": "https://peak.wiki.gg/images/thumb/Yellow_Berrynana_Peel.png/192px-Yellow_Berrynana_Peel.png?512b95",
    "BISHOP": "https://peak.wiki.gg/images/thumb/Bishop_Black.png/64px-Bishop_Black.png?9a2fe4",
    "KING": "https://peak.wiki.gg/images/thumb/King_Black.png/64px-King_Black.png?cd0105",
    "KNIGHT": "https://peak.wiki.gg/images/thumb/Knight_Black.png/64px-Knight_Black.png?8c2f00",
    "PAWN": "https://peak.wiki.gg/images/thumb/Pawn_Black.png/64px-Pawn_Black.png?8c2f00",
    "QUEEN": "https://peak.wiki.gg/images/thumb/Queen_Black.png/64px-Queen_Black.png?8c2f00",
    "ROOK": "https://peak.wiki.gg/images/thumb/Rook_Black.png/64px-Rook_Black.png?8c2f00",
    "BIRD": "https://peak.wiki.gg/images/thumb/Cooked_Bird.png/192px-Cooked_Bird.png?ea44a3",
    "STICK": "https://peak.wiki.gg/images/thumb/FireWood.png/64px-FireWood.png?852c2e",
    "TORN PAGE": "https://peak.wiki.gg/images/thumb/Scroll.png/192px-Scroll.png?6a5530",
    "COCONUT HALF": "https://peak.wiki.gg/images/thumb/Half-Coconut.png/192px-Half-Coconut.png?ff191b",
    "ANTI-ROPE CANNON": "https://peak.wiki.gg/images/thumb/Anti-Rope_Cannon.png/192px-Anti-Rope_Cannon.png?1fa9f9",
    "LOC: NAME_CHEATER'S COMPASS": "https://peak.wiki.gg/images/thumb/Warp_Compass.png/192px-Warp_Compass.png?eb4ff1    ",
};


function getWikiIcon(itemName) {
    if (manualImageOverrides[itemName.toUpperCase()]) {
        const overrideUrl = manualImageOverrides[itemName.toUpperCase()];
        return `https://images.weserv.nl/?url=${encodeURIComponent(overrideUrl)}&default=https://lucide.dev/api/icons/package`;
    }
    
    const formatted = itemName.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('_');
    
    const wikiUrl = `https://peak.wiki.gg/images/thumb/${formatted}.png/64px-${formatted}.png`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(wikiUrl)}&default=https://lucide.dev/api/icons/x`;
}

function filterItems(query) {
    const term = query.toLowerCase();
    const items = document.querySelectorAll('.preset-item-card');
    
    items.forEach(item => {
        const name = item.dataset.name.toLowerCase();
        if (name.includes(term)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterListItems(listType) {
    const items = document.querySelectorAll('.preset-item-card');
    const selectedIds = currentChallenge[listType] || [];
    
    items.forEach(item => {
        const itemId = parseInt(item.dataset.id);
        if (selectedIds.includes(itemId)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function updateItemButtonState(itemId, listType, element) {
    if (currentChallenge[listType].includes(itemId)) {
        switch(listType) {
            case 'disallowedItems':
                element.classList.add('bg-red-500', 'text-white', 'border-red-500');
                element.classList.remove('border-[--color-border]');
                break;
            case 'allowedItemsOnly':
                element.classList.add('bg-green-500', 'text-white', 'border-green-500');
                element.classList.remove('border-[--color-border]');
                break;
            case 'oneTimeUseItems':
                element.classList.add('bg-blue-500', 'text-white', 'border-blue-500');
                element.classList.remove('border-[--color-border]');
                break;
        }
    } else {
        element.classList.remove('bg-red-500', 'text-white', 'border-red-500', 
                                'bg-green-500', 'border-green-500', 
                                'bg-blue-500', 'border-blue-500');
        element.classList.add('border-[--color-border]');
    }
}

function updatePresetOutput() {
    document.getElementById('preset-json-output').textContent = JSON.stringify(currentChallenge, null, 2);
}

function updatePresetField(key, value) {
    currentChallenge[key] = value;
    savePresetCache();
    updatePresetOutput();
}

const confirmed = {
            'allowedItemsOnly': false,
            'disallowedItems': false,
            'oneTimeUseItems': false
        }

function toggleItemInList(itemIds, listType) {
    const firstId = itemIds[0];
    
    if (currentChallenge[listType].includes(firstId)) {
        currentChallenge[listType] = currentChallenge[listType].filter(id => !itemIds.includes(id));
    } else {
        const messages = {
            'allowedItemsOnly': "⚠️ WHITELIST WARNING ⚠️\nOnly items in this list can be picked up. All other items will be ignored.\n\nAdd this item to the whitelist?",
            'disallowedItems': "⚠️ BLACKLIST WARNING ⚠️\nItems in this list cannot be picked up.\n\nAdd this item to the blacklist?",
            'oneTimeUseItems': "⚠️ ONE-TIME USE WARNING ⚠️\nThese items disappear forever after one use until a new run.\n\nAdd this item to the one-time use list?"
        };

        if (messages[listType] &&  confirmed[listType] !== true) {
            if (confirm(messages[listType])) {
                confirmed[listType] = true;
                currentChallenge[listType].push(...itemIds);
            } else {
                return;
            }
        } else {
            currentChallenge[listType].push(...itemIds);
        }
    }
    
    savePresetCache();
    updatePresetOutput();
    
    const itemName = Object.keys(itemsData).find(key => itemsData[key][0] === firstId);
    if (itemName) {
        const itemCard = document.querySelector(`.preset-item-card[data-name="${itemName}"]`);
        if (itemCard) {
            const buttons = itemCard.querySelectorAll('button');
            buttons.forEach((btn, idx) => {
                const btnListType = ['disallowedItems', 'allowedItemsOnly', 'oneTimeUseItems'][idx];
                updateItemButtonState(firstId, btnListType, btn);
            });
        }
    }
}

function clearPresetConfig() {
    if (confirm("Are you sure you want to clear ALL configuration? This will reset everything to default.")) {
        currentChallenge = {
            Name: "", Creators: "", Notes: "", MinAscent: -1, 
            AllowHigherAscents: true, disallowedItems: [], 
            oneTimeUseItems: [], allowedItemsOnly: [],
            Itemless: false, DisableRopeTypes: false,
            alwaysHaveTick: false, noMultiplayer: false,
            minimumPlayers: 1, allowReserveStamina: true,
            noSprinting: false, noJumping: false, noBackpack: false, startSkeleton: false,
            controlLockLeftAndRight_Ground: false, controlLockForwardAndBackward_Ground: false,
            controlLockLeftAndRight_Climb: false, controlLockForwardAndBackward_Climb: false,
        };
        savePresetCache();
        renderPeakPresetsPage();
        alert("Configuration cleared to defaults!");
    }
}

function importConfig() {
    try {
        const input = document.getElementById('import-json-area').value;
        const parsed = JSON.parse(input);
        currentChallenge = { ...currentChallenge, ...parsed };
        savePresetCache();
        renderPeakPresetsPage();
        alert("Configuration Loaded Successfully!");
    } catch (e) {
        alert("Invalid JSON format. Please check your input.");
    }
}

function resetItemFilter() {
    const items = document.querySelectorAll('.preset-item-card');
    items.forEach(item => {
        item.style.display = 'block';
    });
}

let itemsData = {};

async function renderPeakPresetsPage() {
    try {
        const res = await fetch('https://gist.githubusercontent.com/AtomicTyler1/913a40238b453d557cb1073fd4c05a83/raw/0802ccd517ba8a052631ea7ba0fd14d876edf48b/peak_list.json');
        itemsData = await res.json();

        contentDiv.innerHTML = `
        <div class="page-transition flex flex-col lg:flex-row gap-8">
            <div class="lg:w-1/3">
                <div class="panel-block p-8 sticky top-8 flex flex-col min-h-[85vh] border-l-4 border-[--color-accent]">
                    <div class="text-center mb-8">
                        <div class="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl mx-auto flex items-center justify-center mb-4 shadow-xl">
                            <i data-lucide="cog" class="w-10 h-10 text-white"></i>
                        </div>
                        <h3 class="text-2xl font-bold">Challenge Creator</h3>
                        <p class="text-xs text-[--color-subtle] uppercase tracking-widest mt-1">Config Editor</p>
                    </div>

                    <div class="space-y-4 flex-grow overflow-y-auto custom-scrollbar pr-2">
                        <div class="p-3 bg-[--color-background-panel] rounded-lg border border-[--color-border]">
                            <h4 class="font-bold text-green-500 text-xs uppercase mb-1">White (Whitelist)</h4>
                            <p class="text-[10px] text-[--color-subtle]">Only these items can be picked up; all others are ignored.</p>
                            <button onclick="filterListItems('allowedItemsOnly')" class="w-full mt-2 text-[8px] bg-green-500/20 text-green-500 py-1 rounded font-bold hover:bg-green-500/30 transition">
                                Show Whitelisted Items (${currentChallenge.allowedItemsOnly.length})
                            </button>
                        </div>
                        <div class="p-3 bg-[--color-background-panel] rounded-lg border border-[--color-border]">
                            <h4 class="font-bold text-red-500 text-xs uppercase mb-1">Black (Blacklist)</h4>
                            <p class="text-[10px] text-[--color-subtle]">These items are forbidden and cannot be picked up.</p>
                            <button onclick="filterListItems('disallowedItems')" class="w-full mt-2 text-[8px] bg-red-500/20 text-red-500 py-1 rounded font-bold hover:bg-red-500/30 transition">
                                Show Blacklisted Items (${currentChallenge.disallowedItems.length})
                            </button>
                        </div>
                        <div class="p-3 bg-[--color-background-panel] rounded-lg border border-[--color-border]">
                            <h4 class="font-bold text-blue-500 text-xs uppercase mb-1">1-Use (One Time)</h4>
                            <p class="text-[10px] text-[--color-subtle]">Item disappears forever after one use until a new run.</p>
                            <button onclick="filterListItems('oneTimeUseItems')" class="w-full mt-2 text-[8px] bg-blue-500/20 text-blue-500 py-1 rounded font-bold hover:bg-blue-500/30 transition">
                                Show 1-Use Items (${currentChallenge.oneTimeUseItems.length})
                            </button>
                        </div>
                        <button onclick="resetItemFilter()" class="w-full text-[8px] bg-[--color-border] py-2 rounded font-bold hover:bg-[--color-accent] hover:text-white transition">
                            Show All Items
                        </button>
                        <div class="border-t border-[--color-border] pt-4">
                            <h4 class="text-xs font-bold uppercase mb-2 text-[--color-accent]">Import Config</h4>
                            <textarea id="import-json-area" placeholder="Paste JSON here..." class="cla-step-input h-24 text-[10px] py-2"></textarea>
                            <button onclick="importConfig()" class="w-full mt-2 text-xs bg-[--color-border] py-2 rounded font-bold hover:bg-[--color-accent] hover:text-white transition">Load JSON</button>
                            <button onclick="clearPresetConfig()" class="w-full mt-2 text-xs bg-red-500/20 text-red-500 py-2 rounded font-bold hover:bg-red-500/30 transition">
                                Clear All Configuration
                            </button>
                        </div>
                    </div>

                    <div class="pt-6 border-t border-[--color-border]">
                        <button onclick="copyPresetsToClipboard()" class="w-full bg-[--color-accent] text-white font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] transition">
                            Copy Final Config
                        </button>
                    </div>
                </div>
            </div>

            <div class="lg:w-2/3 space-y-6 pb-20">
                <details open class="panel-block group">
                    <summary class="p-5 cursor-pointer font-bold text-lg flex items-center list-none select-none">
                        <i data-lucide="edit-3" class="w-5 h-5 mr-3 text-[--color-accent]"></i> Details
                        <i data-lucide="chevron-down" class="ml-auto w-4 h-4 transition-transform group-open:rotate-180"></i>
                    </summary>
                    <div class="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Challenge Name" class="cla-step-input" value="${currentChallenge.Name}" oninput="updatePresetField('Name', this.value)">
                        <input type="text" placeholder="Creators" class="cla-step-input" value="${currentChallenge.Creators}" oninput="updatePresetField('Creators', this.value)">
                        <textarea placeholder="Notes..." class="md:col-span-2 cla-step-input h-20 py-2" oninput="updatePresetField('Notes', this.value)">${currentChallenge.Notes}</textarea>
                    </div>
                </details>

                <details class="panel-block group">
                    <summary class="p-5 cursor-pointer font-bold text-lg flex items-center list-none select-none">
                        <i data-lucide="zap" class="w-5 h-5 mr-3 text-[--color-accent]"></i> Modifiers
                        <i data-lucide="chevron-down" class="ml-auto w-4 h-4 transition-transform group-open:rotate-180"></i>
                    </summary>
                    <div class="px-6 pb-6 pt-2">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 mb-6">
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">No Sprinting</span>
                                <input type="checkbox" ${currentChallenge.noSprinting ? 'checked' : ''} 
                                       onchange="updatePresetField('noSprinting', this.checked)" 
                                       class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">No Jumping</span>
                                <input type="checkbox" ${currentChallenge.noJumping ? 'checked' : ''} 
                                       onchange="updatePresetField('noJumping', this.checked)" 
                                       class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">Itemless</span>
                                <input type="checkbox" ${currentChallenge.Itemless ? 'checked' : ''} 
                                       onchange="updatePresetField('Itemless', this.checked)" 
                                       class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">Always Have Tick</span>
                                <input type="checkbox" ${currentChallenge.alwaysHaveTick ? 'checked' : ''} 
                                       onchange="updatePresetField('alwaysHaveTick', this.checked)" 
                                       class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">No Multiplayer</span>
                                <input type="checkbox" ${currentChallenge.noMultiplayer ? 'checked' : ''} 
                                       onchange="updatePresetField('noMultiplayer', this.checked)" 
                                       class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">No Backpack</span>
                                <input type="checkbox" ${currentChallenge.noBackpack ? 'checked' : ''} 
                                       onchange="updatePresetField('noBackpack', this.checked)" 
                                       class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">Allow Higher Acents</span>
                                <input type="checkbox" ${currentChallenge.AllowHigherAscents ? 'checked' : ''} 
                                       onchange="updatePresetField('AllowHigherAscents', this.checked)" 
                                       class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">Disable Rope, Chains & Vines</span>
                                <input type="checkbox" ${currentChallenge.DisableRopeTypes ? 'checked' : ''} 
                                       onchange="updatePresetField('DisableRopeTypes', this.checked)" 
                                       class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">Allow Reserve Stamina</span>
                                <input type="checkbox" ${currentChallenge.allowReserveStamina ? 'checked' : ''} 
                                       onchange="updatePresetField('allowReserveStamina', this.checked)" 
                                       class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">Start Skeleton</span>
                                <input type="checkbox" ${currentChallenge.startSkeleton ? 'checked' : ''} 
                                    onchange="updatePresetField('startSkeleton', this.checked)" 
                                    class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">Lock Left/Right (Ground)</span>
                                <input type="checkbox" ${currentChallenge.controlLockLeftAndRight_Ground ? 'checked' : ''} 
                                    onchange="updatePresetField('controlLockLeftAndRight_Ground', this.checked)" 
                                    class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">Lock Forward/Back (Ground)</span>
                                <input type="checkbox" ${currentChallenge.controlLockForwardAndBackward_Ground ? 'checked' : ''} 
                                    onchange="updatePresetField('controlLockForwardAndBackward_Ground', this.checked)" 
                                    class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">Lock Left/Right (Climb)</span>
                                <input type="checkbox" ${currentChallenge.controlLockLeftAndRight_Climb ? 'checked' : ''} 
                                    onchange="updatePresetField('controlLockLeftAndRight_Climb', this.checked)" 
                                    class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-[--color-border]/30">
                                <span class="text-sm font-medium">Lock Forward/Back (Climb)</span>
                                <input type="checkbox" ${currentChallenge.controlLockForwardAndBackward_Climb ? 'checked' : ''} 
                                    onchange="updatePresetField('controlLockForwardAndBackward_Climb', this.checked)" 
                                    class="w-4 h-4 accent-[--color-accent] cursor-pointer">
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[--color-border] pt-4">
                            <div>
                                <label class="text-[10px] font-bold uppercase text-[--color-subtle]">Min Ascent (-1 = Tenderfoot)</label>
                                <input type="number" class="cla-step-input" value="${currentChallenge.MinAscent}" oninput="updatePresetField('MinAscent', parseInt(this.value))">
                            </div>
                            <div>
                                <label class="text-[10px] font-bold uppercase text-[--color-subtle]">Minimum Players</label>
                                <input type="number" class="cla-step-input" value="${currentChallenge.minimumPlayers}" oninput="updatePresetField('minimumPlayers', parseInt(this.value))">
                            </div>
                        </div>
                    </div>
                </details>

                <details open class="panel-block group">
                    <summary class="p-5 cursor-pointer font-bold text-lg flex items-center list-none select-none">
                        <i data-lucide="package" class="w-5 h-5 mr-3 text-[--color-accent]"></i> Item Database
                        <i data-lucide="chevron-down" class="ml-auto w-4 h-4 transition-transform group-open:rotate-180"></i>
                    </summary>
                    <div class="px-6 pb-6 pt-2">
                        <input type="text" placeholder="Search items..." class="cla-step-input w-full mb-4 px-4" oninput="filterItems(this.value)">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                            ${Object.entries(itemsData).map(([name, ids]) => {
                                const isBlacklisted = currentChallenge.disallowedItems.includes(ids[0]);
                                const isWhitelisted = currentChallenge.allowedItemsOnly.includes(ids[0]);
                                const isOneTime = currentChallenge.oneTimeUseItems.includes(ids[0]);
                                
                                return `
                                <div class="preset-item-card border border-[--color-border] rounded-xl p-3 flex flex-col gap-2" data-name="${name}" data-id="${ids[0]}">
                                    <div class="flex items-center gap-3">
                                        <img src="${getWikiIcon(name)}" 
                                             class="w-8 h-8 object-contain">
                                        <span class="text-[10px] font-black uppercase flex-1 leading-tight">${name}</span>
                                    </div>
                                    <div class="flex gap-1">
                                        <button onclick="toggleItemInList([${ids}], 'disallowedItems')" class="flex-1 text-[8px] p-1 rounded font-bold border ${isBlacklisted ? 'bg-red-500 text-white border-red-500' : 'border-[--color-border]'}">Black</button>
                                        <button onclick="toggleItemInList([${ids}], 'allowedItemsOnly')" class="flex-1 text-[8px] p-1 rounded font-bold border ${isWhitelisted ? 'bg-green-500 text-white border-green-500' : 'border-[--color-border]'}">White</button>
                                        <button onclick="toggleItemInList([${ids}], 'oneTimeUseItems')" class="flex-1 text-[8px] p-1 rounded font-bold border ${isOneTime ? 'bg-blue-500 text-white border-blue-500' : 'border-[--color-border]'}">1-Use</button>
                                    </div>
                                </div>`;
                            }).join('')}
                        </div>
                    </div>
                </details>

                <pre id="preset-json-output" class="panel-block p-6 text-[10px] font-mono text-amber-200 overflow-x-auto whitespace-pre-wrap">${JSON.stringify(currentChallenge, null, 2)}</pre>
            </div>
        </div>
        `;
        lucide.createIcons();
    } catch (error) {
        console.error("Failed to load items data:", error);
        contentDiv.innerHTML = `
        <div class="page-transition">
            <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-8">Peak Presets</h2>
            <p class="text-lg text-[--color-subtle] mb-8">Failed to load items data. Please try again later.</p>
        </div>
        `;
    }
}

function copyPresetsToClipboard() {
    const text = document.getElementById('preset-json-output').textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Challenge Config Copied to Clipboard!');
    });
}

function renderLevelingPage() {
    contentDiv.innerHTML = `
    <div class="page-transition">
        <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-8 border-b-2 border-[--color-border] pb-2">Leveling XP Calculator</h2>
        <p class="text-lg text-[--color-subtle] mb-8">Calculate the exact XP needed to reach your target level with the Leveling mod.</p>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-1 panel-block p-6 flex flex-col">
                <div class="flex flex-col items-center mb-6">
                    <img src="https://gcdn.thunderstore.io/live/repository/icons/AtomicStudio-Leveling-0.2.0.png.128x128_q95.png" class="w-32 h-32 rounded-2xl shadow-xl mb-4" alt="Leveling Mod Icon">
                    <h3 class="text-2xl font-extrabold text-[--color-accent] text-center mb-2">Leveling</h3>
                    <p class="text-sm text-[--color-subtle] text-center font-semibold">by AtomicStudio</p>
                    <span class="text-xs text-[--color-text-main] bg-[--color-subtle]/20 px-3 py-1 rounded-full mt-2">v0.2.0</span>
                </div>
                
                <div class="flex-grow space-y-4 mb-6">
                    <div class="border-t border-[--color-border] pt-4">
                        <h4 class="text-sm font-bold text-[--color-text-main] mb-2 flex items-center">
                            <i data-lucide="info" class="w-4 h-4 mr-2 text-[--color-accent]"></i>
                            About This Mod
                        </h4>
                        <p class="text-sm text-[--color-subtle] leading-relaxed">
                            The Leveling mod adds a progressive XP and leveling system to PEAK. Gain experience through gameplay and unlock new levels!
                        </p>
                    </div>
                    
                    <div class="border-t border-[--color-border] pt-4">
                        <h4 class="text-sm font-bold text-[--color-text-main] mb-3 flex items-center">
                            <i data-lucide="calculator" class="w-4 h-4 mr-2 text-[--color-accent]"></i>
                            XP Formula
                        </h4>
                        <div class="bg-[--color-primary-bg] p-3 rounded-lg font-mono text-xs text-[--color-text-main] border border-[--color-border]">
                            XP per level = Level × 100
                        </div>
                        <div class="bg-[--color-primary-bg] p-3 rounded-lg font-mono text-xs text-[--color-text-main] border border-[--color-border]">
                            Total XP = 50×(T²−T−S²+S)
                        </div>
                        <p class="text-xs text-[--color-subtle] mt-2 italic">
                            This formula calculates total XP required from starting level S to target level T.
                        </p>
                    </div>
                </div>
                
                <a href="https://thunderstore.io/c/peak/p/AtomicStudio/Leveling/" target="_blank" class="w-full bg-[--color-accent] text-white font-bold py-3 rounded-lg shadow-lg hover:opacity-90 transition duration-300 flex items-center justify-center">
                    <i data-lucide="external-link" class="w-5 h-5 mr-2"></i>
                    View on Thunderstore
                </a>
            </div>

            <div class="lg:col-span-2 space-y-6">
                <div class="panel-block p-6">
                    <h3 class="text-xl font-bold mb-6 flex items-center">
                        <i data-lucide="target" class="w-5 h-5 mr-2 text-[--color-accent]"></i>
                        Calculate XP Requirements
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label class="block text-sm font-semibold text-[--color-text-main] mb-2">
                                <i data-lucide="arrow-up-from-line" class="w-4 h-4 inline mr-1 text-[--color-accent]"></i>
                                Start Level
                            </label>
                            <input id="leveling-start" type="number" min="0" placeholder="0" class="cla-step-input text-xl font-bold">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-[--color-text-main] mb-2">
                                <i data-lucide="flag" class="w-4 h-4 inline mr-1 text-[--color-accent]"></i>
                                Target Level
                            </label>
                            <input id="leveling-end" type="number" min="1" placeholder="10" class="cla-step-input text-xl font-bold">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-[--color-text-main] mb-2">
                                <i data-lucide="zap" class="w-4 h-4 inline mr-1 text-[--color-accent]"></i>
                                Current XP
                            </label>
                            <input id="leveling-xp" type="number" min="0" placeholder="0" class="cla-step-input text-xl font-bold">
                        </div>
                    </div>

                    <div class="flex justify-center">
                        <button onclick="updateLevelingXP()" class="px-8 py-3 rounded-full font-bold text-lg bg-[--color-accent] text-white shadow-lg hover:scale-105 transition duration-300 flex items-center">
                            <i data-lucide="calculator" class="w-5 h-5 mr-2"></i>
                            Calculate XP
                        </button>
                    </div>
                </div>

                <div class="panel-block p-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center">
                        <i data-lucide="trophy" class="w-5 h-5 mr-2 text-[--color-accent]"></i>
                        Results
                    </h3>
                    <div id="leveling-result" class="text-center py-12 text-2xl font-extrabold text-[--color-subtle] opacity-0 transition-opacity duration-300">
                        Enter values above
                    </div>
                </div>
                
                <div class="panel-block p-6 bg-gradient-to-br from-[--color-subtle]/10 to-transparent">
                    <h3 class="text-lg font-bold mb-3 flex items-center">
                        <i data-lucide="lightbulb" class="w-5 h-5 mr-2 text-[--color-accent]"></i>
                        Quick Tips
                    </h3>
                    <ul class="space-y-2 text-sm text-[--color-text-main]">
                        <li class="flex items-start">
                            <i data-lucide="check" class="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0"></i>
                            <span>Each level requires progressively more XP (Level × 100)</span>
                        </li>
                        <li class="flex items-start">
                            <i data-lucide="check" class="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0"></i>
                            <span>Current XP is subtracted from the total requirement</span>
                        </li>
                        <li class="flex items-start">
                            <i data-lucide="check" class="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0"></i>
                            <span>Use this tool to plan your progression goals!</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;
    lucide.createIcons();
}

function calculateXP(startLevel, endLevel, currentXP = 0.0) {
    let totalXP = 0;
    for (let level = startLevel; level < endLevel; level++) {
        totalXP += level * 100;
    }
    return totalXP - currentXP;
}

function updateLevelingXP() {
    const start = parseInt(document.getElementById("leveling-start").value) || 0;
    const end = parseInt(document.getElementById("leveling-end").value) || 0;
    const currentXP = parseInt(document.getElementById("leveling-xp").value) || 0;
    const result = document.getElementById("leveling-result");

    if (isNaN(start) || isNaN(end) || end <= start) {
        result.textContent = "Please enter a valid target level higher than start level.";
        result.classList.remove("opacity-0");
        return;
    }

    const xpNeeded = calculateXP(start, end, currentXP);
    result.textContent = `Experience Needed: ${xpNeeded.toLocaleString()}`;
    result.classList.remove("opacity-0");
}

function updateClaButtonStates() {
    const playBtn = document.getElementById('cla-play-btn');
    const stopBtn = document.getElementById('cla-stop-btn');

    if (playBtn) {
        playBtn.disabled = CLA_STATE.isPlaying;
        playBtn.classList.toggle('opacity-50', CLA_STATE.isPlaying);
        playBtn.classList.toggle('cursor-not-allowed', CLA_STATE.isPlaying);
    }
    if (stopBtn) {
        stopBtn.disabled = !CLA_STATE.isPlaying;
        stopBtn.classList.toggle('opacity-50', !CLA_STATE.isPlaying);
        stopBtn.classList.toggle('cursor-not-allowed', !CLA_STATE.isPlaying);
    }
}

function updateClaPreviewLight(step) {
    const lightElement = document.getElementById('cla-preview-light');
    if (!lightElement) return;

    if (step === null) return;

    const r = Math.round(step.r);
    const g = Math.round(step.g);
    const b = Math.round(step.b);
    const a = step.a;
    const color = `rgba(${r}, ${g}, ${b}, ${a})`;

    lightElement.style.backgroundColor = color;
    lightElement.style.boxShadow = `0 0 20px ${color}`;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function formatClaSteps(steps) {
    return steps.map(step => {
        const r = Math.round(step.r);
        const g = Math.round(step.g);
        const b = Math.round(step.b);
        const a = step.a.toFixed(2).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
        const ms = Math.round(step.ms);
        return `{'${r},${g},${b},${a}','${ms}'}`;
    }).join(',');
}

function parseClaSteps(input) {
    const stepRegex = /\{'(\d+),(\d+),(\d+),([\d\.]+)','(\d+)'\}/g;
    const steps = [];
    let match;

    if (input.trim().length === 0) {
        throw new Error("Input cannot be empty.");
    }

    while ((match = stepRegex.exec(input)) !== null) {
        steps.push({
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3]),
            a: parseFloat(match[4]),
            ms: parseInt(match[5])
        });
    }

    if (steps.length === 0) {
        throw new Error("Invalid animation data format. Must be {'R,G,B,A','TIME_IN_MS'},{'R,G,B,A','TIME_IN_MS'},...");
    }
    return steps;
}

function updateClaContent() {
    const stepsContainer = document.getElementById('cla-steps-container');
    if (stepsContainer) {
        stepsContainer.innerHTML = CLA_STATE.steps.map(renderClaStep).join('');
    }

    const outputDiv = contentDiv.querySelector('.bg-gray-100.dark\\:bg-gray-400');
    if (outputDiv) {
        outputDiv.textContent = formatClaSteps(CLA_STATE.steps);
    }

    lucide.createIcons();
    updateClaButtonStates();
    if (!CLA_STATE.isPlaying) {
        updateClaPreviewLight(CLA_STATE.steps[0]);
    }
}

window.copyClaToClipboard = () => {
    const dataString = formatClaSteps(CLA_STATE.steps);
    navigator.clipboard.writeText(dataString).then(() => {
        showMessage('cla-message', 'Animation data copied to clipboard!', 'text-green-500 bg-green-100 dark:bg-green-900');
    }).catch(err => {
        showMessage('cla-message', 'Failed to copy data. Check browser permissions.', 'text-red-500 bg-red-100 dark:bg-red-900');
    });
};

window.importClaFromClipboard = async () => {
    try {
        const dataString = await navigator.clipboard.readText();
        const newSteps = parseClaSteps(dataString);

        stopClaAnimation();
        CLA_STATE.steps = newSteps;
        CLA_STATE.currentStepIndex = 0;

        renderClaPage();
        showMessage('cla-message', 'Animation data imported successfully!', 'text-green-500 bg-green-100 dark:bg-green-900');
    } catch (error) {
        showMessage('cla-message', 'Import failed: ' + error.message, 'text-red-500 bg-red-100 dark:bg-red-900');
    }
};

window.updateClaStepColor = (index, hex) => {
    const rgb = hexToRgb(hex);
    if (rgb) {
        CLA_STATE.steps[index].r = rgb.r;
        CLA_STATE.steps[index].g = rgb.g;
        CLA_STATE.steps[index].b = rgb.b;
        updateClaContent();
    }
};

window.updateClaStepRgb = (index, component, value) => {
    let val = parseInt(value);
    if (isNaN(val) || val < 0) val = 0;
    if (val > 255) val = 255;
    CLA_STATE.steps[index][component] = val;
    updateClaContent();
};

window.updateClaStepAlpha = (index, value) => {
    let alpha = parseFloat(value);
    if (isNaN(alpha) || alpha < 0) alpha = 0;
    if (alpha > 1) alpha = 1;
    CLA_STATE.steps[index].a = parseFloat(alpha.toFixed(2));
    updateClaContent();
};

window.updateClaStepOpacitySlider = (index, value) => {
    let alpha = parseInt(value) / 100;
    CLA_STATE.steps[index].a = alpha;
    updateClaContent();
};

window.updateClaStepMs = (index, value) => {
    let ms = parseInt(value);
    if (isNaN(ms) || ms < 100) ms = 100;
    CLA_STATE.steps[index].ms = ms;
    updateClaContent();
};

window.addClaStep = () => {
    CLA_STATE.steps.push(JSON.parse(JSON.stringify(DEFAULT_CLA_STEP)));
    updateClaContent();
};

window.deleteAllClaSteps = () => {
    if (confirm("Are you sure you want to delete ALL animation steps? This will reset the animation to the default single step.")) {
        stopClaAnimation();
        CLA_STATE.steps = [JSON.parse(JSON.stringify(DEFAULT_CLA_STEP))];
        CLA_STATE.currentStepIndex = 0;
        updateClaContent();
        showMessage('cla-message', 'All steps deleted. Default step restored.', 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900');
    }
};

window.deleteClaStep = (index) => {
    if (CLA_STATE.steps.length > 1 && confirm("Are you sure you want to delete this animation step?")) {
        CLA_STATE.steps.splice(index, 1);
        stopClaAnimation();
        CLA_STATE.currentStepIndex = 0;
        updateClaContent();
    }
};

window.moveClaStep = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < CLA_STATE.steps.length) {
        const [movedStep] = CLA_STATE.steps.splice(index, 1);
        CLA_STATE.steps.splice(newIndex, 0, movedStep);
        stopClaAnimation();
        CLA_STATE.currentStepIndex = 0;

        const idxA = index;
        const idxB = newIndex;

        updateClaContent();

        [idxA, idxB].forEach(idx => {
            const el = document.getElementById(`cla-step-${idxB}`);
            if (el) {
                el.classList.add('animate-swap');
                setTimeout(() => {
                    el.classList.remove('animate-swap');
                }, 300);
            }
        });
    }
};

window.loadClaPreset = (presetName) => {
    if (CLA_PRESETS[presetName]) {
        CLA_STATE.steps = JSON.parse(JSON.stringify(CLA_PRESETS[presetName]));
        stopClaAnimation();
        CLA_STATE.currentStepIndex = 0;
        renderClaPage();
    }
};

function startClaAnimation() {
    if (CLA_STATE.isPlaying) return;
    CLA_STATE.isPlaying = true;

    const lightElement = document.getElementById('cla-preview-light');

    const runStep = () => {
        if (!CLA_STATE.isPlaying) {
            updateClaPreviewLight(CLA_STATE.steps[0]);
            updateClaButtonStates();
            return;
        }

        const step = CLA_STATE.steps[CLA_STATE.currentStepIndex];

        const r = Math.round(step.r);
        const g = Math.round(step.g);
        const b = Math.round(step.b);
        const a = step.a;
        const ms = step.ms;

        const color = `rgba(${r}, ${g}, ${b}, ${a})`;

        lightElement.style.backgroundColor = color;
        lightElement.style.boxShadow = `0 0 20px ${color}`;

        CLA_STATE.currentStepIndex = (CLA_STATE.currentStepIndex + 1) % CLA_STATE.steps.length;

        CLA_STATE.animationTimeout = setTimeout(runStep, ms);
    };

    CLA_STATE.currentStepIndex = 0;
    runStep();
    updateClaButtonStates();
}

function stopClaAnimation() {
    if (CLA_STATE.animationTimeout) {
        clearTimeout(CLA_STATE.animationTimeout);
        CLA_STATE.animationTimeout = null;
    }

    CLA_STATE.isPlaying = false;
    CLA_STATE.currentStepIndex = 0;

    if (CLA_STATE.steps.length > 0) {
        updateClaPreviewLight(CLA_STATE.steps[0]);
    } else {
        updateClaPreviewLight(DEFAULT_CLA_STEP);
    }
    updateClaButtonStates();
}

function renderClaStep(step, index) {
    const hex = rgbToHex(step.r, step.g, step.b);
    const opacity = step.a * 100;
    return `
        <div id="cla-step-${index}" class="cla-step-card panel-block p-4 mb-4 flex items-center shadow-lg flame-border">
            <div class="flex-grow grid grid-cols-12 gap-4 items-center">
                <div class="col-span-1 text-center font-bold text-xl text-[--color-accent]">${index + 1}</div>

                <div class="col-span-4 flex flex-col space-y-2">
                    <div class="flex items-center space-x-3">
                        <label class="font-semibold text-sm">Color Picker:</label>
                        <input type="color" value="${hex}" 
                               onchange="updateClaStepColor(${index}, this.value)" 
                               class="w-8 h-8 rounded-full cursor-pointer focus:ring-2 focus:ring-[--color-accent] p-0 m-0 border-none"> 
                    </div>
                    
                    <div class="flex items-center space-x-1">
                        <label class="text-xs font-semibold">R</label>
                        <input type="number" min="0" max="255" value="${step.r}" 
                               onchange="updateClaStepRgb(${index}, 'r', this.value)" 
                               class="cla-step-input w-1/4 !p-1 text-center">
                        <label class="text-xs font-semibold">G</label>
                        <input type="number" min="0" max="255" value="${step.g}" 
                               onchange="updateClaStepRgb(${index}, 'g', this.value)" 
                               class="cla-step-input w-1/4 !p-1 text-center">
                        <label class="text-xs font-semibold">B</label>
                        <input type="number" min="0" max="255" value="${step.b}" 
                               onchange="updateClaStepRgb(${index}, 'b', this.value)" 
                               class="cla-step-input w-1/4 !p-1 text-center">
                    </div>
                </div>
                
                <div class="col-span-3">
                    <label for="ms-${index}" class="font-semibold text-sm block mb-1">Duration (ms):</label>
                    <input id="ms-${index}" type="number" min="100" step="50" max="10000" value="${step.ms}" 
                           onchange="updateClaStepMs(${index}, this.value)" 
                           class="cla-step-input">
                </div>
                
                <div class="col-span-3">
                    <label class="font-semibold text-sm block mb-1">Alpha (0.00 - 1.00):</label>
                    <div class="flex items-center space-x-2">
                        <input id="alpha-${index}" type="number" min="0" max="1" step="0.01" value="${step.a.toFixed(2)}" 
                               onchange="updateClaStepAlpha(${index}, this.value)" 
                               class="cla-step-input w-1/3 !p-1 text-center">
                        <input type="range" min="0" max="100" value="${opacity.toFixed(0)}" 
                               oninput="updateClaStepOpacitySlider(${index}, this.value)" 
                               class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-[--color-accent]">
                    </div>
                </div>
                
                <div class="col-span-1 flex flex-col items-center justify-center space-y-1">
                    <button onclick="deleteClaStep(${index})" class="text-red-500 hover:text-red-700 p-1 transition duration-150" title="Delete Step">
                        <i data-lucide="trash-2" class="w-5 h-5"></i>
                    </button>
                    <div class="flex flex-col space-y-1 mt-2">
                        ${index > 0 ? `<button onclick="moveClaStep(${index}, -1)" class="text-[--color-text-main] hover:text-[--color-accent] p-1 transition duration-150" title="Move Up"><i data-lucide="arrow-up" class="w-4 h-4"></i></button>` : ''}
                        ${index < CLA_STATE.steps.length - 1 ? `<button onclick="moveClaStep(${index}, 1)" class="text-[--color-text-main] hover:text-[--color-accent] p-1 transition duration-150" title="Move Down"><i data-lucide="arrow-down" class="w-4 h-4"></i></button>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderClaPage() {
    const presets = Object.keys(CLA_PRESETS).map(key => `
        <button onclick="loadClaPreset('${key}')" class="w-full bg-[--color-background-panel] hover:bg-[--color-border] border border-[--color-border] text-[--color-text-main] py-2 px-4 rounded-lg text-sm font-semibold transition duration-300">
            ${key}
        </button>
    `).join('');

    contentDiv.innerHTML = `
        <div class="page-transition">
            <h2 class="text-4xl font-extrabold text-[--color-text-main] mb-8 border-b-2 border-[--color-border] pb-2">Cozy Lights Animator</h2>
            <p class="text-lg text-[--color-subtle] mb-8">Visually create animation steps for the Cozy Lights mod and copy the resulting string into your config file.</p>
            
            <div class="flex space-x-4 mb-6">
                <button onclick="window.copyClaToClipboard()" class="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                    <i data-lucide="clipboard" class="w-5 h-5 mr-2 inline"></i>Copy to Clipboard
                </button>
                <button onclick="window.importClaFromClipboard()" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                    <i data-lucide="file-input" class="w-5 h-5 mr-2 inline"></i>Import Animation
                </button>
            </div>
            <div id="cla-message" class="text-center transition-opacity duration-500" style="opacity: 0;"></div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div class="lg:col-span-1 panel-block p-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center">
                        <i data-lucide="eye" class="w-5 h-5 mr-2 text-[--color-accent]"></i> Live Preview
                    </h3>
                    <div class="light-preview-container">
                        <div id="cla-preview-light" 
                             class="w-24 h-24 rounded-full" 
                             style="background-color: rgba(0,0,0,0); transition: background-color 0s, box-shadow 0s; box-shadow: 0 0 20px var(--color-accent)80;">
                        </div>
                    </div>
                    
                    <div class="mt-6 flex justify-between space-x-4">
                        <button id="cla-play-btn" onclick="startClaAnimation()" class="flex-1 bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition duration-300">
                            <i data-lucide="play" class="w-5 h-5 mr-1 inline"></i> Play
                        </button>
                        <button id="cla-stop-btn" onclick="stopClaAnimation()" class="flex-1 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition duration-300">
                            <i data-lucide="square" class="w-5 h-5 mr-1 inline"></i> Stop
                        </button>
                    </div>

                    <h4 class="text-lg font-bold mt-6 mb-4 border-t border-[--color-border] pt-4">Presets</h4>
                    <div class="flex flex-col space-y-2">
                        ${presets}
                    </div>
                </div>

                <div class="lg:col-span-2">
                     <h3 class="text-xl font-bold mb-4 flex items-center">
                        <i data-lucide="list-ordered" class="w-5 h-5 mr-2 text-[--color-accent]"></i> Animation Steps (${CLA_STATE.steps.length} total)
                    </h3>
                    <div id="cla-steps-scroll-container" class="max-h-[34rem] overflow-y-auto pr-2">
                        <div id="cla-steps-container">
                            ${CLA_STATE.steps.map(renderClaStep).join('')}
                        </div>
                    </div>
                    <div class="flex space-x-4 mt-4">
                        <button onclick="addClaStep()" class="flex-1 border-2 border-dashed border-[--color-subtle] text-[--color-text-main] py-3 rounded-lg hover:bg-[--color-subtle]/30 transition duration-300 font-semibold flex items-center justify-center">
                            <i data-lucide="plus" class="w-5 h-5 mr-2"></i> Add New Step
                        </button>
                        <button onclick="deleteAllClaSteps()" class="w-1/3 border-2 border-dashed border-red-500/50 text-red-500 py-3 rounded-lg hover:bg-red-500/10 transition duration-300 font-semibold flex items-center justify-center">
                            <i data-lucide="trash-2" class="w-5 h-5 mr-2"></i> Delete All
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="panel-block p-6 mt-6">
                <h3 class="text-xl font-bold mb-4 flex items-center">
                    <i data-lucide="code" class="w-5 h-5 mr-2 text-[--color-accent]"></i> Animation String Output
                </h3>
                <div class="bg-gray-100 dark:bg-gray-500 p-4 rounded-lg font-mono text-sm break-all">
                    ${formatClaSteps(CLA_STATE.steps)}
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
    updateClaButtonStates();
    updateClaPreviewLight(CLA_STATE.steps[0]);
}

async function initializeApp() {
    const initialPage = window.location.hash.substring(1) || 'home';

    if (['home', 'communities', 'projects', 'tools', 'cla', 'leveling', 'peakPresets'].includes(initialPage)) {
        navigate(initialPage);
    } else {
        navigate('home');
    }

    await Promise.all([
        fetchModData(),
        fetchGithubRepos()
    ]);

    refreshDataViews();
}

window.onload = () => {
    initializeTheme();
    initializeApp();

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('theme-toggle-mobile').addEventListener('click', toggleTheme);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(link.getAttribute('data-page'));
        });
    });

    document.querySelectorAll('.nav-link-mobile').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(link.getAttribute('data-page'));
        });
    });
    document.getElementById('mobile-menu-button').addEventListener('click', toggleMobileMenu);

    window.addEventListener('hashchange', () => {
        const page = window.location.hash.substring(1) || 'home';
        if (['home', 'communities', 'projects', 'tools', 'cla', 'leveling', 'peakPresets'].includes(page)) {
            navigate(page);
        } else {
            navigate('home');
        }
    });
};

const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiCodePosition = 0;
let easterEggActivated = false;

function rickroll() {
    if (easterEggActivated) return;

    const overlay = document.getElementById('rickroll-overlay');
    const video = document.getElementById('rickroll-video');

    if (overlay && video) {
        overlay.classList.remove('konami-hidden');

        video.play().catch(error => {
            video.muted = true;
            video.play().catch(e => {
                console.error("Failed to play video even muted. User must interact.", e);
            });
        });

        easterEggActivated = true;
    }
}

document.addEventListener('keydown', (e) => {
    if (easterEggActivated) return;
    
    let requiredKey = konamiCode[konamiCodePosition];

    if (e.keyCode === requiredKey) {
        konamiCodePosition++;

        if (konamiCodePosition === konamiCode.length) {
            rickroll();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    initializeTheme();
    await fetchModData();
    await fetchGithubRepos();
    navigate(window.location.hash.replace("#", "") || "home");
    refreshDataViews();
    lucide.createIcons();
});