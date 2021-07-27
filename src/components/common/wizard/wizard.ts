import { Component, Vue, Prop, Watch, Inject } from 'vue-property-decorator';
import { CurrentPage } from '../baselayout/base.vm';

interface StepsInterface extends Object {
    title: string,
    completed: boolean
}

@Component
export default class Wizard extends Vue {

    @Inject()
    currentPage: CurrentPage;

    @Prop({ default: {} }) modelHeader: StepsInterface[];

    index: number = 0;

    @Watch('currentPage.index')
    incrementIndex(newVal: number, oldVal: number) {
        if (this.modelHeader.length >= newVal) {
            this.index = newVal;
        }
        this.currentPage.index = newVal;
    }

    mounted() {
        this.index = this.currentPage.index;
        this.turnTabIndex('wizard__article wizard__article--active');
    }

    turnTabIndex(classList: string) {
        setTimeout(() => {
            const articlesList = document.querySelectorAll('.wizard__article');

            let links: NodeList;
            let buttons: NodeList;
            let inputs: NodeList;

            articlesList.forEach(article => {
                if (classList) {
                    if (article.classList.value.includes(classList)) {
                        links = article.querySelectorAll('a');
                        buttons = article.querySelectorAll('button');
                        inputs = article.querySelectorAll('input');
                        this.setTabIndex(links, '0');
                        this.setTabIndex(buttons, '0');
                        this.setTabIndex(inputs, '0');

                    } else {
                        links = article.querySelectorAll('a');
                        buttons = article.querySelectorAll('button');
                        inputs = article.querySelectorAll('input');
                        this.setTabIndex(links, '-1');
                        this.setTabIndex(buttons, '-1');
                        this.setTabIndex(inputs, '-1');

                    }
                }
            });
        });
    }

    setTabIndex(data: any, valueTabIndex: string) {
        if (data) {
            data.forEach((el: any) => {
                if (el) {
                    el.removeAttribute('tabIndex');
                    el.setAttribute('tabIndex', valueTabIndex);
                }
            });
        }
    }
}
