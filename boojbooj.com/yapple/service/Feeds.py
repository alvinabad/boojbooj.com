from django.contrib.syndication.feeds import Feed
#from chicagocrime.models import NewsItem

class LatestEntries(Feed):
    title = "Testing MAIN TITLE"
    link = "/sitenews/"
    description = "Updates on changes and additions to chicagocrime.org."

    def items(self):
        lst = []
        lst.append("hello1")
        return NewsItem.objects.order_by('-pub_date')[:5]
