<template>
    <article
        ref="article"
        class="wizard__article wizard__article--active sw-categories"
    >
        <h2 class="sw-categories__title">Categories</h2>
        <ul class="sw-categories__list">
            <li
                v-for="(item, index) of model"
                :key="index"
                class="sw-categories__item"
                :data-title="item.title"
                @click.prevent="selectCategories(item)"
            >
                <a
                    href="#"
                    :title="`Select ${item.title}`"
                    class="sw-categories__link"
                >
                    <figure class="sw-categories__figure">
                        <img
                            :src="item.image"
                            :alt="`Preview${item.title}`"
                            class="sw-categories__image"
                        />
                    </figure>
                    <span
                        class="sw-categories__text"
                        v-html="item.title"
                    ></span>
                </a>
            </li>
        </ul>
    </article>
</template>
<script src="./categories.ts"></script>
<style src="./categories.scss" scoped></style>
