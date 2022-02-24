function refreshDataTable() {
	$('#data_table').DataTable().ajax.reload();
}
$("#btnSearch").click(function(e) {
	e.preventDefault();
	dt.draw();
});

var dt = $('#data_table').DataTable({
	"responsive": true,
	"autoWidth": false,
	"processing": true,
	"serverSide": true,
	'serverMethod': 'post',
	"searching": true,
	'pageLength': 100,
	"lengthMenu": [
		[10, 25, 50, 100, -1],
		['10', '25', '50', '100', 'all']
	],

	"ajax": {
		'url': "Category.php",
		'data': function(data) {
			data.param1 = $('#param1').val();
		}
	},
	'columns': [{
			"data": "id",
			render: function(data, type, row, meta) {
				return meta.row + meta.settings._iDisplayStart + 1;
			}
		}, {
			data: 'name'
		},
		{
			data: 'edit'
		},
		{
			data: 'delete'
		}
	],
	dom: 'lBfrtip',
	buttons: [{
			className: 'btn btn-outline-secondary btn-sm ',
			extend: 'excelHtml5',
			text: '<i class="fa fa-file-excel-o"> XLS</i>',
			title: 'Category Report',
			exportOptions: {
				columns: [0, 1]
			}
		},
		{
			className: 'btn btn-outline-secondary btn-sm ',
			extend: 'pdfHtml5',
			title: 'Category Report',
			text: '<i class="fa fa-file-pdf-o"> PDF</i>',
			exportOptions: {
				columns: 'thead th:not(.noExport)'
			},
			customize: function(doc) {
				//doc.content[1].table.widths = ['60%', '20%'];
			}
		}
	],
});
