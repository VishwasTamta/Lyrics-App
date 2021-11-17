async function getApi(){
    let term = document.getElementById("searchID").value;
    let listUrl = `https://api.lyrics.ovh/suggest/${term}` 
    const response = await fetch(listUrl)
    var data = await response.json();
    show(data, term)
}

function show(data ,a){
    //Hide indicator result text
    document.getElementById("resultTxt").style.display = "none"
    var tab = ""
    for(let r of data.data){
        if(r == undefined){
            continue
        }
        
        tab += `<tr>
                    <td colspan="2"><strong>${r.artist.name}</strong> ${" - " + r.title}</p></td>
                    <td><button onclick="getLyrics('${r.artist.name}', '${r.title}')" class="lyricBtn">Get Lyrics</button></td>
                </tr>`;
                // Setting inner html
                document.getElementById("result").innerHTML = tab;
            }
            // document.getElementById("result").innerHTML += '<tr><td><button id="nextBtn">Next</button></td></tr>'
}

async function getLyrics(artist, title){
    let url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    const response = await fetch(url) 
    var data = await response.json();
    // var lyrics = data.lyrics.replace(/\n/g, "<br>")
    var lyrics = data.lyrics
    lyrics = data.lyrics.replaceAll("\n", "<br>")
    console.log(lyrics)
    document.getElementById('result').innerHTML = `<p><strong>${artist} -</strong> <span>${title}</span></p><p>${lyrics}</p>`
}

