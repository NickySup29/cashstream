---
layout: default
title: Blog1
---

# Blog

{% for post in site.posts %}
- **[{{ post.title }}]({{ post.url }})**  
  <small>{{ post.date | date: "%d %B %Y" }}</small>
{% endfor %}
