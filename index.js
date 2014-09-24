var _ = require('underscore');

module.exports = MITab = (function() {
     
    var nodes = {}; 
    var links = [];
    var scores = {};
    var textInParenthesis = /\((.*?)\)/;
    var textInQuotes = /\"(.*?)\"/;
    var textInTax = /\:(.*?)\(/;
    
    // Creates a node from identifiers, alternative idenifiers,
    // and taxonomy values
    var _getNode = function(idStr, altIdsStr, taxStr){
        
        var ids = _.map(idStr.split('|'), _mapPub);
        var node = {
            id: ids[0].value,
            ids: ids,
            altIds: _.map(altIdsStr.split('|'), _mapPub),
            taxonomy: _.uniq(_.map(taxStr.split('|'), _mapTaxonomy))
        }
        return node;
    }
    
    // Parses a string and returns an interaction
    var _parse = function(line, i){
        
        if (! _.isString(line) || line.length === 0) {
            console.warn('MITab cannot parse line ' + i);
            return;
        }
        
        var fields = line.split('\t');
        
        var nodeA = _getNode(fields[0], fields[2], fields[9]);
        var nodeB = _getNode(fields[1], fields[3], fields[10]);
        
        
        var interaction = {
            source: nodeA.id,
            target: nodeB.id,
            detMethods: _.map(fields[6].split('|'), _mapField),
            firstAuthor: fields[7].split('|'),
            publications: _.map(fields[8].split('|'), _mapPub),
            intTypes: _.map(fields[11].split('|'), _mapField),
            sourceDbs: _.map(fields[12].split('|'), _mapField),
            intIds : _.map(fields[13].split('|'), _mapPub),
            scores: _.map(fields[14].split('|'), _mapScore)
        };
        
        nodes[nodeA.id] = nodeA;
        nodes[nodeB.id] = nodeB;
        
        return interaction;
    }
    
    var _mapScore = function(scoreStr){
        var arr = scoreStr.split(':'), score = {name:arr[0], score:+arr[1]};
        
        _addScore(score);
        return score;
    };
    
    var _mapField = function(fieldStr){
        if(fieldStr.match(textInQuotes) == null || fieldStr.match(textInParenthesis) == null){
            var arr = fieldStr.split(':');
            return {name:arr[0], score:arr[1]};
        }
        return {name:fieldStr.match(textInQuotes)[1], value:fieldStr.match(textInParenthesis)[1]};
    };
    
    var _mapPub = function(pubStr){
        var arr = pubStr.split(':');
        return {name:arr[0], value:arr[1]};
    };
    
    var _mapTaxonomy = function(taxStr){
        if(taxStr != '-'){
            return (taxStr.match(textInTax) == null) ? taxStr.split(':')[1] : taxStr.match(textInTax)[1];
        }
    };
    
    var _addScore = function(score){
        if( !_.isNaN(score.score) && _.isNumber(score.score)){
            if(_.has(scores, score.name)){
                if(scores[score.name].min > score.score) scores[score.name].min = score.score;
                if(scores[score.name].max < score.score) scores[score.name].max = score.score;
            }else{
                scores[score.name] = {name:score.name, min:score.score, max:score.score};
            }
        }
    };
    
    function MITab() {}
    
    MITab.parse = function(text) {
        
        if (! _.isString(text)) {
            throw 'MITab cannot parse ' + typeof text;
            return;
        }
        
        // Initialize variables
        nodes = {}; 
        links = [];
        scores = {};
        
        var lines = text.split('\n');
        
        var interactions = _.map(lines, _parse)
        var nodeval = _.values(nodes);
        
        return {
            links: interactions,
            nodes: nodeval,
            ids: _.pluck(nodeval, 'id'),
            taxa: _.compact(_.reduce(nodeval, function(memo,n){ return _.union(memo,n.taxonomy)},[])),
            scores: _.values(scores)
        };
    };
    
    return MITab;
})();