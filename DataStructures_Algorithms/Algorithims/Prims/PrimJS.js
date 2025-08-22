import GraphJS from '.\GraphJS.js'

class Prim extends GraphJS
{
    constructor()
    {
        super();
    }

    primsAlgorithim()
    {
        let in_mst = Array(this.size).fill(false);
        let key_values = Array(this.size).fill(Infinity);
        let parents = Array(this.size).fill(-1);
        key_values[0] = 0;

        console.log("Edge \tWeight");
        for(let _ = 0; _ < this.size; _++)
        {
            let values = [...Array(this.size).keys()].filter(v => !in_mst[v]);

            let u = values.reduce((s, v) => key_values[v] < key_values[s]? v : s, values[0]);

            if(parents[u] != -1)
                console.log(`${self.vertex_data[parents[u]]}-${self.vertex_data[u]} \t${self.adj_matrix[u][parents[u]]}`)

            for(let v = 0; v < this.size; v++)
            {
                if(0 < this.adj_matrix[u][v] < key_values[v] && !in_mst(v))
                {
                    key_values[v] = this.adj_matrix[u][v];
                    parents[v] = u;
                }
            }
        }
    }
}