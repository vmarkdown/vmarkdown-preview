<template>
    <div class="vmarkdown-preview-tools">
        <hsc-menu-style-white>
            <hsc-menu-bar style="border-radius: 0 0 4pt 0;">
                <!--<hsc-menu-bar-item label="File">-->
                    <!--<hsc-menu-item label="New" @click="window.alert('New')" />-->
                    <!--<hsc-menu-item label="Open" @click="window.alert('Open')" />-->
                    <!--<hsc-menu-separator/>-->
                    <!--<hsc-menu-item label="Save" @click="window.alert('Save')" :disabled="true" />-->
                    <!--<hsc-menu-item label="Export to">-->
                        <!--<hsc-menu-item label="PDF" />-->
                        <!--<hsc-menu-item label="HTML" />-->
                    <!--</hsc-menu-item>-->
                <!--</hsc-menu-bar-item>-->
                <!--<hsc-menu-bar-item label="Edit">-->
                    <!--<hsc-menu-item label="Undo" keybind="meta+z" @click="window.alert('Undo')" />-->
                    <!--<hsc-menu-separator/>-->
                    <!--<hsc-menu-item label="Cut" keybind="meta+x" @click="window.alert('Cut')" />-->
                    <!--<hsc-menu-item label="Copy" keybind="meta+c" @click="window.alert('Copy')" />-->
                    <!--<hsc-menu-item label="Paste" keybind="meta+v" @click="window.alert('Paste')" :disabled="true" />-->
                <!--</hsc-menu-bar-item>-->

                <hsc-menu-bar-item label="Themes">
                    <hsc-menu-item label="default" type="radio" v-model="theme" value="default" />
                    <hsc-menu-item label="github" type="radio" v-model="theme" value="github" />
                </hsc-menu-bar-item>

                <hsc-menu-bar-item label="View">
                    <hsc-menu-item label="preview" @click="" :sync="true" />
                </hsc-menu-bar-item>


                <!--<hsc-menu-bar-item label="Checkmark">-->
                    <!--<hsc-menu-item label="Check" type="radio" v-model="checked" :value="true" :disabled="checked" />-->
                    <!--<hsc-menu-item label="Unheck" type="radio" v-model="checked" :value="false" :disabled="!checked" />-->
                    <!--<hsc-menu-separator/>-->
                    <!--<hsc-menu-item :label="checked ? '😃 Checked' : '😯 Not Checked'" v-model="checked" />-->
                    <!--&lt;!&ndash; <hsc-menu-item :label="checked ? '😃 ' : '😯 '" @click="checked = !checked" :checked="checked" /> can be set :checked manually &ndash;&gt;-->
                <!--</hsc-menu-bar-item>-->
                <!--<hsc-menu-bar-item label="Select">-->
                    <!--<hsc-menu-item label="Item A" v-model="selected" value="A" />-->
                    <!--<hsc-menu-item label="Item B" v-model="selected" value="B" />-->
                    <!--<hsc-menu-item label="Item C" v-model="selected" value="C" />-->
                    <!--<hsc-menu-item label="Item D" v-model="selected" value="D" />-->
                    <!--<hsc-menu-separator/>-->
                    <!--<hsc-menu-item :label="selected.join(',')" :disabled="true" />-->
                <!--</hsc-menu-bar-item>-->
                <!--<hsc-menu-bar-item label="Window.open">-->
                    <!--<hsc-menu-item label="vue-menu" @click="window.open('https://github.com/michitaro/vue-menu')" :sync="true" />-->
                    <!--<hsc-menu-item label="vue-window" @click="window.open('https://github.com/michitaro/vue-window')" :sync="true" />-->
                <!--</hsc-menu-bar-item>-->
            </hsc-menu-bar>
        </hsc-menu-style-white>
    </div>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                theme: 'github',
                checked: true,
                selected: ['A'],
            }
        },
        computed: {
            window() { return window },
        }
    }
</script>

<style lang="scss">

    .vmarkdown-preview-tools{
        position: fixed;
        top: 0;
        width: 100%;

        .menubar {
            margin: 0 auto;
            opacity: 0.2;
            &:hover {
                opacity: 1;
            }
        }
    }
</style>