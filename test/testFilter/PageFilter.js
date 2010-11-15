
// Called by "testFilter.js

function getKeysFromCells(cells){
	var keys = [];
	cells.forEach(function(cell){
		if(keys.indexOf(cell['key']) === -1){
			keys.push(cell['key']);
		}
	})
	return keys;
}

module.exports = {
	value_as_string: function(client,assert){
		// Test PageFilter
		client
		.getScanner('node_table')
		.create({
			startRow: 'test_filter_row_1',
			endRow: 'test_filter_row_4',
			filter: {"type":"PageFilter","value":"2"}
		}, function(error,id){
			assert.ifError(error);
			this.get(function(error,cells){
				assert.ifError(error);
				assert.strictEqual(4,cells.length);
				var keys = getKeysFromCells(cells);
				assert.deepEqual(['test_filter_row_1','test_filter_row_2'],keys);
				this.delete();
			})
		})
	},
	value_as_int: function(client,assert){
		// Test PageFilter
		client
		.getScanner('node_table')
		.create({
			startRow: 'test_filter_row_1',
			endRow: 'test_filter_row_4',
			filter: {"type":"PageFilter","value":2}
		}, function(error,id){
			assert.ifError(error);
			this.get(function(error,cells){
				assert.ifError(error);
				assert.strictEqual(4,cells.length);
				var keys = getKeysFromCells(cells);
				assert.deepEqual(['test_filter_row_1','test_filter_row_2'],keys);
				this.delete();
			})
		})
	}
}