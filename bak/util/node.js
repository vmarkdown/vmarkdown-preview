const findNode = require("./unist-find-node");

function _findNode(root, position) {
    let node = findNode(root, position);

    if(!node || node.type === 'root') {
        return null;
    }

    return node;
}


function findNodeByLine(root, line) {
    let node = findNode(root, {line: line,column: 1});

    if(!node || node.type === 'root') {
        return null;
    }

    return node;
}

function findNodeFromLine(root, line, maxNum = 10) {

    let node = findNode(root, {line: line,column: 1});

    const lastLine = root.position.end.line;

    if(!node || node.type === 'root') {
        if(maxNum <=0 && line + 1 > lastLine) {
            return null;
        }
        return findNodeFromLine(root, line + 1, maxNum - 1);
    }

    return node;
}

module.exports = {
    findNodeByLine: findNodeByLine,
    findNodeFromLine: findNodeFromLine,
    findNode: _findNode
};
