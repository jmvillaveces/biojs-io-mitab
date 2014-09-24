//Require chai assert for test
var assert = require('chai').assert;

// Require fs to get interactions from file
var fs = require('fs');

//Require MITab parser client 
var mitab = require('../');

// {ath to the interactions file
var path = 'test/interactions.txt';

// Variable holding the interactions in the file
var intStr;

// Reading the interactions file
describe('Read file', function(){
    it('should read without error', function(done){
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) throw err;
            intStr = data;
            done();
        });
    });
});

// Test data
describe('Check file contents', function(){

    it('should be a string', function(){
        assert.isString(intStr, 'data is a string');
    });
    
});

var intObj;

// Test the parser
describe('Parse Interactions', function(){

    it('should throw error', function(){
        assert.throws(mitab.parse, {});
    });
    
    it('should return empty links', function(){
        assert.equal(mitab.parse('dummy   interaction with    less    tabs').links, 0)
    });
    
    it('should parse the interactions', function(){
        intObj = mitab.parse(intStr);
    });
    
    it('should be an object', function(){
        assert.isObject(intObj);
    });
});

describe('Check nodes', function(){

    it('should be an array', function(){
        assert.isArray(intObj.nodes);
    });
    
    it('should contain four nodes', function(){
        assert.equal(intObj.nodes.length, 4);
    });
});

describe('Check first node', function(){
    
    it('should be an Object', function(){
        assert.isObject(intObj.nodes[0]);
    });
    
    it('should have id Q82235', function(){
        assert.equal(intObj.nodes[0].id, 'Q82235');
    });
    
    it('should have ids array', function(){
        assert.isArray(intObj.nodes[0].ids);
    });
    
    it('should have altIds array', function(){
        assert.isArray(intObj.nodes[0].altIds);
    });
    
    it('should have taxonomy array', function(){
        assert.isArray(intObj.nodes[0].taxonomy);
    });
});

describe('Check interactions', function(){
    
    it('should be an array', function(){
        assert.isArray(intObj.links);
    });
    
    it('should contain two interactions', function(){
        assert.equal(intObj.links.length, 2);
    });
});

describe('Check first interaction', function(){
    
    it('should be an Object', function(){
        assert.isObject(intObj.links[0]);
    });
    
    it('should have source Q82235', function(){
        assert.equal(intObj.links[0].source, 'Q82235');
    });
    
    it('should have target Q9DBG9', function(){
        assert.equal(intObj.links[0].target, 'Q9DBG9');
    });
    
    it('should have firstAuthor Kanamori et al. (2003)', function(){
        assert.equal(intObj.links[0].firstAuthor, 'Kanamori et al. (2003)');
    });
    
    it('should have publications array', function(){
        assert.isArray(intObj.links[0].publications);
    });
    
    it('should have intTypes array', function(){
        assert.isArray(intObj.links[0].publications);
    });
    
    it('should have sourceDbs array', function(){
        assert.isArray(intObj.links[0].publications);
    });
    
    it('should have intIds array', function(){
        assert.isArray(intObj.links[0].publications);
    });
    
    it('should have scores array', function(){
        assert.isArray(intObj.links[0].publications);
    });
});

describe('Check ids', function(){

    it('should be an array', function(){
        assert.isArray(intObj.ids);
    });
    
    it('should contain four ids', function(){
        assert.equal(intObj.ids.length, 4);
    });
    
    it('should be [Q82235, Q9DBG9, P04578, B0FAM1]', function(){
        assert.deepEqual(intObj.ids, ['Q82235', 'Q9DBG9', 'P04578', 'B0FAM1']);
    });
});

describe('Check taxa', function(){

    it('should be an array', function(){
        assert.isArray(intObj.taxa);
    });
    
    it('should contain four taxa', function(){
        assert.equal(intObj.taxa.length, 4);
    });
});

describe('Check scores', function(){

    it('should be an array', function(){
        assert.isArray(intObj.scores);
    });
    
    it('should contain one score', function(){
        assert.equal(intObj.scores.length, 1);
    });
    
    it('should have min one score', function(){
        assert.equal(intObj.scores.length, 1);
    });
});

