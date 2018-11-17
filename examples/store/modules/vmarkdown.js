import VMarkDown from 'vmarkdown';
const vmarkdown = new VMarkDown({
    config: {
        root: {
            tagName: 'article',
            className: 'markdown-body'
        }
    }
});


// initial state
// shape: [{ id, quantity }]
const state = {
    value: null,
    firstVisibleNode: null
};

// getters
const getters = {
    firstVisibleNode: (state) => (firstVisibleLine) => {
        const node = vmarkdown.findNodeFromLine(firstVisibleLine);
        let coverageRatio = 0;
        if(node) {
            const position = node.position;
            const startLine = position.start.line;
            const endLine = position.end.line;
            const currentLine = firstVisibleLine<startLine?startLine:firstVisibleLine;
            const allLine = endLine - startLine + 1;
            coverageRatio = (currentLine-startLine)/allLine;
        }
        return {
            node: node,
            coverageRatio: coverageRatio
        };
    },
    activeNode: (state) => (cursor) => {
        let node = vmarkdown.findNode(cursor);

        if(node && node.tagName === 'code' && node.parent && node.parent.tagName === 'pre') {
            node = node.parent;
        }

        let coverageRatio = 0;
        if(node) {

            const position = node.position;

            if(
                (
                    node.tagName === 'code' ||
                    (node.data && node.data.props && node.data.props.code)
                )

                && position && position.start.line < position.end.line) {
                const firstVisibleLine = cursor.line;
                const startLine = position.start.line;
                const endLine = position.end.line;
                const currentLine = firstVisibleLine<startLine?startLine:firstVisibleLine;
                const allLine = endLine - startLine + 1;
                coverageRatio = (currentLine-startLine)/allLine;
            }

        }
        return {
            node: node,
            coverageRatio: coverageRatio
        };

    }
};

// actions
const actions = {
    async parse ({ commit, state }, value) {
        // setTimeout(() => {
        //     commit('setValue', value);
        // }, 1000)


        const vdom = await vmarkdown.process(value);
        commit('setValue', vdom);
    }
};

// mutations
const mutations = {
    h(state, h) {
        vmarkdown.h = h;
    },
    setValue (state, value) {
        state.value = value;
    },
    scrollTo(state, firstVisibleLine) {
        const vm = this._vue;
        vm.scrollTo(firstVisibleLine);
    },
    activeTo(state, cursor) {
        const vm = this._vue;
        vm.activeTo(cursor);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}