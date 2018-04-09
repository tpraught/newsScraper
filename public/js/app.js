$(document).ready(function() {
    $("#scrapeButton").on("click", function() {
        // event.preventDefault();
        console.log("Scrape button working!");

        $.ajax({
            method: "GET",
            url: "/scrape"
        })
        .done(function(data) {
            console.log("scrape button: " + data);
            window.location.href = "/";
        });
    });

    $("#saveArticle").on("click", function(event) {
        event.preventDefault();
        var thisID = $(this).attr("data-id");

        console.log("Article is saving");
        console.log(thisID);

        $.ajax({
            method: "POST",
            url: "/saved/" + thisID
        })
        .done(function(data) {
            console.log(data);
            window.location.href = "/";
        });
    });

    
    $("#deleteArticle").on("click", function() {
        var thisID = $(this).attr("data-id");

        console.log("Article is deleted");
        console.log(thisID);

        $.ajax({
            method: "POST",
            url: "/deleted/" + thisID
        })
        location.reload();
    });

    $("#modalButton").on("click", function() {
        console.log("Modal button clicked");

        $("#note").empty();

        var thisID = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "/articles/" + thisID
        })
        .done(function(data) {
            console.log(data);

            $("#note").append('<p class="noteContents">');

            if(data.note) {
                $(".noteContents").append('<ul id="noteList">');
                for (var i = 0; i < data.lenght; i++) {
                    $("#noteList").append('<li id="' + data.note[i]._id + '">' + data.note[i].body + ' ' + '<button class="btn" data-id="' + data.note[i]._id + '" id="deleteNote">x</button></li>');
                }
                $(".noteContents").append("</ul>");
            } else {
                $(".noteContents").text("No notes for this article");
            }

            var form = $('<div class="form-group">');
            var formLabel = $('<label for="noteText" class="col-form-label">Add a note for this article</label>');
            var textArea = $('<textarea class="form-control" rows="4" id="noteText"></textarea>');

            var modalFooter = $('<div class="modal-footer">');
            var modalSaveBtn = $('<button type="submit" class="btn btn-primary" data-id="' + data._id + '" id="saveNote">Save</button>');
            var modalFooterCreate = $(modalSaveBtn).append(modalFooter);
        });
    });

    $("#saveNote").on("click", function() {
        console.log("saving note");

        var thisID = $(this).attr("data-id");

        $.ajax({
            method: "POST",
            url: "/articles/" + thisID,
            data: {
                body: $("#noteText").val()
            }
        })
        .done(function(data) {
            console.log(data);

            $("#noteText").val("");
            $(".modal-footer").empty();
            $("#myModal").modal("hide");
        });
    });

    $("#deleteNote").on("click", function() {
        var thisID = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "/notes/" + thisID
        })
        .done(function(data) {
            console.log(data);

            $("#" + data._id).remove();
        });
    });

});