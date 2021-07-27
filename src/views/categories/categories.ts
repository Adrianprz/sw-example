import { Component, Inject, Vue } from 'vue-property-decorator';
import { CurrentPage } from 'Project/components/common/baselayout/base.vm';

@Component
export default class Categories extends Vue {
    @Inject()
    currentPage: CurrentPage;

    model: Array<{ id: string, title: string; image: string }> = [
        {
            id:'starships',
            title: 'Starships',
            image: require('Media/starship.png')
        },
        {
            id:'people',
            title: 'People',
            image: require('Media/people.png')
        },
        {
            id:'planets',
            title: 'Planets',
            image: require('Media/planet.png')
        }
    ];
    articleElement: HTMLElement;

    constructor() {
        super();
    }

    mounted() {
        this.articleElement = this.$refs.article as HTMLElement;
        this.$router.push({ name: 'Categories'},).catch(() => { });
    }

    selectCategories(item: { id: string, title: string; image: string }) {
        this.$store.dispatch('setShowLoader', true);
        this.articleElement.classList.add('wizard__article--hide');
        setTimeout(() => {
            this.$router.push({ name: 'List', params: { id: item.id } },).catch(() => { });
            this.currentPage.index = 1;
        }, 1000);

    }

}
