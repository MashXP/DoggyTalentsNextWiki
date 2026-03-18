---
title: Commands
---

(1.16+ only content)
## Locate
If you know the dog's name :
<pre>/dog locate byname &lt;your name&gt; &lt;your dog name&gt;</pre>
If you know the dog's UUID (retrievable via hovering the dog's name in the death message).
<pre>/dog locate byuuid &lt;your name&gt; &lt;your dog uuid&gt;</pre>

## Revive
If you know the dog's name :
<pre>/dog revive byname &lt;your name&gt; &lt;your dog name&gt;</pre>
If you know the dog's UUID (retrievable via hovering the dog's name in the death message).
<pre>/dog revive byuuid &lt;your name&gt; &lt;your dog uuid&gt;</pre>

## Team (Vanilla's command)
Useful for multiplayer when you don't want your dogs to attack your friends if they accidentally hit your dog.

Making a team:<pre>/team add <team_name>
</pre>Joining a team:<pre>/team join <player_name>
</pre>And repeat for other players.

### Exceptions:
**Your dog's name has conflicting characters**
- If your dog's name contains special characters (including spaces), they might not be correctly interpreted by the command line, thus making the syntax invalid. For example: <code>BêTô</code> <code>Doggo#001-Dog</code> <code>Allegro Ma Non Troppo</code> <code>#%$@^</code> . In this case, surrounding the name in quotes or double quotes (&quot;&quot;) will work.
<pre>/dog revive byname &lt;your name&gt; &quot;&lt;your dog name&gt;&quot;</pre>