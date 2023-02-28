import Dictionary from '../06.HashTable/dictionary'

export default class Graph {
  private vertices: (string | number)[] = [];
  private adjList: Dictionary<string | number, (string | number)[]> = new Dictionary();

  constructor(private isDirected = false) {}

  /**
   * 向图中添加一个新的顶点
   */
  addVertex(v: string | number) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  /**
   * 添加顶点之间的边
   */
  addEdge(v: string | number, w: string | number) {
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }

    this.adjList.get(v).push(w);

    if (!this.isDirected) {
      this.adjList.get(w).push(v);
    }
  }

  /**
   * 返回顶点列表
   */
  getVertices() {
    return this.vertices;
  }

  /**
   * 返回邻接表
   */
  getAdjList() {
    return this.adjList;
  }

  /**
   * 创建 toString 方法
   */
  toString() {
    let s = '';
    for (let i = 0; i < this.vertices.length; i++) {
      s += this.vertices[i] + ' -> ';
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + ' ';
      }
      s += '\n';
    }
    return s;
  }
}
