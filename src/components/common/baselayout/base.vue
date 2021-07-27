<template>
    <Wizard :modelHeader="initModelSteps">
        <template :slot="'PanelWizard'">
            <router-view />
        </template>
    </Wizard>
</template>

<script src="./base.ts"></script>
<style src="./base.scss" scoped></style>