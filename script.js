$(document).ready(function() {
    $.support.cors = true;
    $('#startButton').click(function() {
        var link = $('#productURL').val();
        if(link == ''){
            alert('Please enter a product link!');
        }else{
            var parts = link.split('/');
            var lastSegment = parts.pop() || parts.pop();
            var productId = lastSegment.split('.')[0];
            var feedbackUrl = 'https://feedback.aliexpress.com/display/productEvaluation.htm?v=2&productId='+productId+'&ownerMemberId=2668009148&companyId=2668009148&memberType=seller&startValidDate=&i18n=true';
            $.ajax({
                url: feedbackUrl,
                type: "GET",
                datatype: 'jsonp',
                success: function(data, jqXHR, textStatus) {
                    var reviews = $(data).find('.feedback-item');
                    var renderHTML = '<table class="table"><tr><td><strong>Name</strong></td><td><strong>Country</strong></td><td><strong>Rating</strong></td><td><strong>Time</strong></td><td><strong>Feedback</strong></td></tr>';
                    $(reviews).each(function(k, v){
                        renderHTML += '<tr>';
                        //reviewName
                        var reviewName = $(v).find('.fb-user-info .user-name a').text();
                        if(reviewName == ''){
                            var reviewName = $(v).find('.fb-user-info .user-name').text();
                        }
                        //reviewCountry
                        var reviewCountry = $(v).find('.fb-user-info .user-country b').text();
                        //reviewContent
                        var reviewContent = $(v).find('.buyer-feedback span:nth-child(1)').text();
                        //reviewTime
                        var reviewTime = $(v).find('.buyer-feedback span:nth-child(2)').text();
                        //reviewRating
                        var reviewRating = $(v).find('.star-view span').attr('style');
                        switch(reviewRating) {
                            case 'width:100%':
                                var reviewRatingValue = '5 stars';
                                break;
                            case 'width:80%':
                                var reviewRatingValue = '4 stars';
                                break;
                            case 'width:60%':
                                var reviewRatingValue = '3 stars';
                                break;
                            case 'width:40%':
                                var reviewRatingValue = '2 stars';
                                break;
                            case 'width:20%':
                                var reviewRatingValue = '1 star';
                                break;
                            default:
                                var reviewRatingValue = '5 stars';
                        }
                        //console.log(reviewName+' - '+reviewCountry+' - '+reviewRatingValue+' - '+reviewTime+' - '+reviewContent);
                        renderHTML += '<td>'+reviewName+'</td><td>'+reviewCountry+'</td><td>'+reviewRatingValue+'</td><td>'+reviewTime+'</td><td>'+reviewContent+'</td>';
                        renderHTML += '</tr>';
                    });
                    renderHTML += '</table>';
                    $('#result').html(renderHTML);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log("Error" + jqXHR);
                }
            });
        }
    });
});