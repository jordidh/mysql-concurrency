
module.exports = {

    /**
     * Funció que loga a consola segons l'estandard d'apache
     * Params:
     * - method: string amb el mètode que es crida
     * - status: string curt amb l'estat d'execució del mètode (OK, ERROR)
     * - result: string amb l'explicació del resultat
     */
    log: function (method, status, result) {
        console.log(` - - [${(new Date).toISOString()}] "${method}" - ${status} - "${result}"`)
    },

    /**
     * Funció que loga un error a consola segons l'estandard d'apache
     * Params:
     * - method: string amb el mètode que es crida
     * - status: string curt amb l'estat d'execució del mètode (OK, ERROR)
     * - result: string amb l'explicació del resultat
     */
     error: function (method, status, result) {
        console.error(` - - [${(new Date).toISOString()}] "${method}" - ${status} - "${result}"`)
    },
}