

This proof-of-concept use the in-HTML <a href="http://ils.sont.la/post/introducing-metafragments-a-common-format-timed-metadata-html">MetaFragments convention</a> I drafted during the MozNewsLab 2011 to <strong>display synchronized subtitles using only CSS3 animations and attribute selectors.</strong>
<br /><br />
No javascript, external subtitle file or proprietary format is used for the subtitles: 
<br /><br />
<em>the subtitles are fully contained in the HTML page as standard links pointing to their corresponding part of the video, using standard media fragments URI.</em>
<br /><br />
As there is currently no way in pure CSS3 to style time-based elements in relation to their own timeline, if you stop the video manually by using the contextual menu, subtitles will get out of sync. 
You always have the possibility to reset the sync by starting the video again via a simple link.
<br /><br />
The CSS use prefixed selectors, but you can take a look at how much more clean and simple it is with only the official syntax here: <a href="style-no-prefix.css">unprefixed style sheet</a>.
<h3>Pros:</h3>
These subtitles are totally accessible and retro-compatible. They work even if you can't access or play the video, and <strong>they are totally useful if CSS is turned off</strong> because they are standard, clickable, readable links.
<br /><br />
Timecode is self-contained as both totally standard media fragments URI (direct click-throught not supported on Firefox) and a custom HTML5 data attribute.
<br /><br />
Given a properly timed transcript, it's very easy to generate this sort of subtitles. I did it manually using a (powerful) text editor. A script would make thing even easier.
<br /><br />
  <h3>Cons:</h3>
We would need to add a little bit of javascript to keep the subtitles in sync if people stop the video.
<br /><br />

<h3>What if we had a <em>:time</em> pseudo-class for media elements?</h3>
No potential addition of Javascript code would be necessary at all if there was a CSS pseudo-class corresponding to the time in the VIDEO element, used in conjonction with the content property
 <br /><br />
 Below is an example CSS code to illustrate how we could use a <em>:time</em> (ie. position in the media) pseudo-class on VIDEO and AUDIO elements – this is fictionnal code, as the time pseudo-class doesn't exist at the moment.
<br /><br />
This code match the A element with the custom data attribute <em>data-time="0:00:24.200,0:00:24.880"</em> and that is the sibling of a VIDEO element playing at 24200ms.
<br /><br />
<pre>
video:24200~a[data-time="0:00:24.200,0:00:24.880"] {
  animation-name    : appear;
  animation-duration: 680ms;
  animation-delay   : 24200ms;
}
</pre>

Another way to use a :time pseudo class would be to append some content to the VIDEO element at some point in time

<pre>
video:24200::after {
  content: "I love this part of the video !";
}
</pre>
<br />
What would *you* do with a :time pseudo class? Does it makes sense to you? Or are you finding that idea totally absurd? :-) <br /><br />

You can find me on twitter here: <a href="http://twitter.com/juliendorra">http://twitter.com/juliendorra</a>
