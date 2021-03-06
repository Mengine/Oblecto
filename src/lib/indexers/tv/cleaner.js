import databases from '../../../submodules/database';

export default { 
    async removeFileLessEpisodes() {
        let results = await databases.episode.findAll({
            include: [databases.file]
        });

        results.forEach((item) => {
            if (item.files && item.files.length > 0)
                return false;

            item.destroy();
        });

    },

    async removePathLessShows() {
        let results = await databases.tvshow.destroy({
            where: {
                directory: ''
            }
        });
    },

    async removeEpisodeslessShows() {
        let results = await databases.tvshow.findAll({
            include: [databases.episode]
        });

        results.forEach((item) => {
            if (item.episodes && item.episodes.length > 0)
                return false;

            item.destroy();
        });
    }
};