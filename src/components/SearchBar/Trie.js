class Node {
  constructor() {
    this.next = {};
    this.isEnd = false;
  }
}
class Trie {
  constructor(dict) {
    this.trie = new Node();
    dict.forEach(item => {
      this.add(item);
    });
  }

  add(str) {
    let node = this.trie;
    for (let i = 0; i < str.length; i++) {
      if (!node.next.hasOwnProperty(str[i])) {
        node.next[str[i]] = new Node();
      }
      node = node.next[str[i]];
    }
    node.isEnd = true;
  }

  search(prefix) {
    let node = this.trie;
    for (let i = 0; i < prefix.length; i++) {
      if (!node.next.hasOwnProperty(prefix[i])) return [];
      node = node.next[prefix[i]]; // find position to start dfs
    }
    let res = [];
    this.searchAll(node, res, prefix);
    return res;
  }

  searchAll(node, res, prefix) {
    if (node.isEnd) {
      res.push(prefix);
    }
    for (let key in node.next) {
      this.searchAll(node.next[key], res, prefix + key);
    }
  }
}

export default Trie;
