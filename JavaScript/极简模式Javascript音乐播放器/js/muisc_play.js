;(function(global){
    var __INFO__ = {
        plugins: "SMmuiscPlay",
        version: "0.0.1",
        author: "Dunizb",
        website: "http://dunizb.com"
    };
    var defualts = {
        audioList: "",
        el: "",
        position: "",
        buttonImgSrc: "",
        htmls: `<audio autoplay loop style="width:0px;">
                    <source src="" type="audio/mpeg" />
                </audio>
                <a style="width:24px;height:24px;display:inline-block;"></a>
                <select>
                </select>`
    };
    var PlayCode = function(options) {
        var settings = Object.assign({}, defualts, options);//缺省值合并
        var audioDom = settings.el ? document.getElementById(settings.el) : document.body;//获得用户传入的节点
        if(!audioDom) audioDom = document.body;

        var audioBox = document.createElement("div");
        audioBox.id = "musicControl";
        audioBox.style = "opacity:0.5;overflow:hidden;position:absolute;z-index:999;" + settings.position;
        audioBox.innerHTML = settings.htmls;
        //插入节点
        audioDom.appendChild(audioBox);

        var audioButton = audioBox.querySelectorAll("a")[0];
        var audioList = audioBox.querySelectorAll("select")[0];
        var audioTag = audioBox.querySelectorAll("audio")[0];

        //跟换播放按钮图片
        if(!settings.buttonImgSrc) {
            console.log(1)
            audioButton.style.backgroundSize = "73px";
            audioButton.style.height = "20px";
            audioButton.style.backgroundPosition = "-1px 0px";
            audioButton.style.backgroundImage = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAAAoCAYAAAAhU2KBAAAMFmlDQ1BJQ0MgUHJvZmlsZQAASImVVwdYU8kWnltSCAktEAEpoTdBinSB0EEQkA42QhIglAgJQcWOLCq4drGgqOiKiIprAWQtiCgWFgF7fSCisrIuFrCg8iYFdH3te+f75s6fM+ec+c/ccyczACjbsrOzM1EVALIEucLIQB9mfEIik9QNMKAHALADDmyOKNs7IiIU/gKj/d9l6DZAJP0Na0msfx3/r6LK5Yk4ACARECdzRZwsiE8AgGtysoW5ABBaod5obm62BA9ArC6EBAEg4hKcKsOaEpwswxOkNtGRvhCzACBT2WxhKgBKEt7MPE4qjKMk4Wgr4PIFEO+A2JOTxuZC/BDiCVlZcyBWJkNsnvxdnNS/xUwei8lmp45hWS5SIfvxRdmZ7Pn/53L8b8nKFI/OYQgbNU0YFCnJGa7bgYw5IRJMhfi0IDksHGI1iC/zuVJ7Cb6fJg6Kkdv3c0S+cM0AAwAUcNl+IRDrQMwQZ8R4y7E9Wyj1hfZoGD83OFqOk4VzIuXx0TxBZlioPM7KNF7wKC7nifyjRm1S+AHBEMNKQ0/kp0XHyXiizXn82DCIlSBuF2VEhch9H+en+YaN2gjFkRLOxhC/SxEGRMpsMM0s0WhemA2HLZ0L1gLGyk2LDpL5YvE8UXzoKAcuz89fxgHj8gQxcm4YrC6fSLlvUXZmhNweK+dlBkbK1hk7KsqLGvXtzIUFJlsH7Ek6e0qEfK6h7NyIaBk3HAWhwBf4ASYQw5YM5oB0wG/rr+uHv2QjAYANhCAV8IC1XDPqEScdEcBnFMgHf0LEA6IxPx/pKA/kQf2XMa3saQ1SpKN5Uo8M8AziLFwb98Td8VD4ZMFmj7vgrqN+TOXRWYn+RD9iEDGAaDHGgwNZZ8ImBPx/owuBPQ9mJ+EiGM3hWzzCM0IH4QnhFqGLcA/EgqfSKHKr2fwC4Q/MmWAq6ILRAuTZJX+fHW4KWTviPrgH5A+54wxcG1jjk2Am3rgXzM0Rar9nKB7j9m0tf5xPwvr7fOR6JUslRzmL5LE34ztm9WMU3+/WiAv7kB8tsZXYcawFO49dwU5jdYCJncPqsVbsjASPVcJTaSWMzhYp5ZYB4/BHbWyrbftsP/8wN1s+v2S9RLm8ebmSj8F3TvZ8IT81LZfpDXdjHjNYwLGZwLS3tXMGQLK3y7aOtwzpno0wrn7T5TQC4FoMlanfdGwjAE49A4A+9E1n9AaW+zoAzrRzxMI8mU6yHQMCoABl+FVowf8OI2AO87EHTsAdsIA/mALCQTRIALPgiqeBLMh5LlgIloEiUALWgc1gO9gF9oID4DA4BurAaXAeXALXQDu4BR7AuugFL8EAGALDCIKQEBpCR7QQfcQEsULsERfEE/FHQpFIJAFJQlIRASJGFiLLkRJkA7Id2YNUIb8ip5DzyBWkA7mHdCN9yBvkE4qhVFQd1UVN0YmoC+qNhqDR6Ew0Fc1B89FCdA26Fa1AD6G16Hn0GnoL7UJfooMYwBQxBmaAWWMumC8WjiViKZgQW4wVY6VYBXYEa4Dv+QbWhfVjH3EiTseZuDWszSA8BufgOfhifDW+HT+A1+LN+A28Gx/AvxJoBB2CFcGNEEyIJ6QS5hKKCKWE/YSThIvwu+klDBGJRAbRjOgMv8sEYjpxAXE1cSexhthI7CD2EAdJJJIWyYrkQQonsUm5pCLSNtIh0jlSJ6mX9IGsSNYn25MDyIlkAbmAXEo+SD5L7iQ/Jw8rqCiYKLgphCtwFeYrrFXYp9CgcF2hV2GYokoxo3hQoinplGWUrZQjlIuUh5S3ioqKhoquitMU+YpLFbcqHlW8rNit+JGqRrWk+lJnUMXUNdRKaiP1HvUtjUYzpbFoibRc2hpaFe0C7THtgxJdyUYpWImrtESpTKlWqVPplbKCsomyt/Is5XzlUuXjyteV+1UUVExVfFXYKotVylROqdxRGVSlq9qphqtmqa5WPah6RfWFGknNVM1fjatWqLZX7YJaDx2jG9F96Rz6cvo++kV6rzpR3Uw9WD1dvUT9sHqb+oCGmsYkjViNeRplGmc0uhgYw5QRzMhkrGUcY9xmfBqnO857HG/cqnFHxnWOe685XpOlydMs1qzRvKX5SYup5a+VobVeq07rkTaubak9TXuudrn2Re3+8erj3cdzxhePPzb+vg6qY6kTqbNAZ69Oq86grp5uoG627jbdC7r9egw9ll663ia9s3p9+nR9T32+/ib9c/p/MDWY3sxM5lZmM3PAQMcgyEBssMegzWDY0MwwxrDAsMbwkRHFyMUoxWiTUZPRgLG+8VTjhcbVxvdNFExcTNJMtpi0mLw3NTONM11hWmf6wkzTLNgs36za7KE5zdzLPMe8wvymBdHCxSLDYqdFuyVq6WiZZllmed0KtXKy4lvttOqYQJjgOkEwoWLCHWuqtbd1nnW1dbcNwybUpsCmzubVROOJiRPXT2yZ+NXW0TbTdp/tAzs1uyl2BXYNdm/sLe059mX2Nx1oDgEOSxzqHV5PsprEm1Q+6a4j3XGq4wrHJscvTs5OQqcjTn3Oxs5Jzjuc77iou0S4rHa57Epw9XFd4nra9aObk1uu2zG3v9yt3TPcD7q/mGw2mTd53+QeD0MPtscejy5PpmeS527PLi8DL7ZXhdcTlhGLy9rPeu5t4Z3ufcj7lY+tj9DnpM97XzffRb6NfphfoF+xX5u/mn+M/3b/xwGGAakB1QEDgY6BCwIbgwhBIUHrg+4E6wZzgquCB6Y4T1k0pTmEGhIVsj3kSahlqDC0YSo6dcrUjVMfhpmECcLqwkF4cPjG8EcRZhE5Eb9NI06LmFY27VmkXeTCyJYoetTsqINRQ9E+0WujH8SYx4hjmmKVY2fEVsW+j/OL2xDXFT8xflH8tQTtBH5CfSIpMTZxf+LgdP/pm6f3znCcUTTj9kyzmfNmXpmlPStz1pnZyrPZs48nEZLikg4mfWaHsyvYg8nByTuSBzi+nC2cl1wWdxO3j+fB28B7nuKRsiHlRapH6sbUvjSvtNK0fr4vfzv/dXpQ+q709xnhGZUZI5lxmTVZ5KykrFMCNUGGoHmO3px5czqyrbKLsrty3HI25wwIQ4T7RYhopqg+Vx0ec1rF5uKfxN15nnlleR/mxs49Pk91nmBe63zL+avmP88PyP9lAb6As6BpocHCZQu7F3kv2rMYWZy8uGmJ0ZLCJb1LA5ceWEZZlrHs9wLbgg0F75bHLW8o1C1cWtjzU+BP1UVKRcKiOyvcV+xaia/kr2xb5bBq26qvxdziqyW2JaUln1dzVl/92e7nrT+PrElZ07bWaW35OuI6wbrb673WH9iguiF/Q8/GqRtrNzE3FW96t3n25iulk0p3baFsEW/p2hq6tX6b8bZ12z5vT9t+q8ynrGaHzo5VO97v5O7sLGeVH9mlu6tk16fd/N139wTuqa0wrSjdS9ybt/fZvth9Lb+4/FK1X3t/yf4vlYLKrgORB5qrnKuqDuocXFuNVour+w7NONR+2O9w/RHrI3tqGDUlR8FR8dE/fk369faxkGNNx12OHzlhcmLHSfrJ4lqkdn7tQF1aXVd9Qn3HqSmnmhrcG07+ZvNb5WmD02VnNM6sPUs5W3h25Fz+ucHG7Mb+86nne5pmNz24EH/hZvO05raLIRcvXwq4dKHFu+XcZY/Lp6+4XTl11eVq3TWna7Wtjq0nf3f8/WSbU1vtdefr9e2u7Q0dkzvOdnp1nr/hd+PSzeCb126F3eq4HXP77p0Zd7rucu++uJd57/X9vPvDD5Y+JDwsfqTyqPSxzuOKf1j8o6bLqetMt19365OoJw96OD0vn4qefu4tfEZ7Vvpc/3nVC/sXp/sC+tr/mP5H78vsl8P9RX+q/rnjlfmrE3+x/modiB/ofS18PfJm9Vutt5XvJr1rGowYfDyUNTT8vviD1ocDH10+tnyK+/R8eO5n0uetXyy+NHwN+fpwJGtkJJstZEuPAhhsaEoKAG8qAaAlwLNDOwAUJdndSyqI7L4oReA/Ydn9TCpOAFSyAIhZCkAoPKOUw2YCMRX2kqN3NAugDg5jTS6iFAd7WSwqvMEQPoyMvNUFgNQAwBfhyMjwzpGRL/sg2XsANObI7nwSIcLz/W4LCWprpYAf5Z/RF2xD/R8DLgAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAEjtJREFUeAHtnHmM3lMXx+8spUVs0drbEUIi4Z2XqIo/CCK2RAhalLfUUkuICCKknW62WEK3EEQQQsQeidQfiGjtu1g7sbS0Ol21OtOZue/5nOf5/tz59Xlmnnk67czrnZP85v5+995z7tnuuctz79QsWrQojhw5MtTV1YW+gBijkyHt6OjwB9o1NTWhs7Mz1NbWZk+p9qhDXQAaPOTV19dnedAlb8iQIV63Jlj9AorXGfxTWgOyDaUbN270Stijvb3d9Yve0a30mlKpTT+qfRcDSmVo0m222SYsWbIkfPTRR86Eysq1RXnsjO4ACAGQIgBlvOM0dbV1Lix1B52knDa75kv3OAl6VAceOnRoWL16dXj33XdDa2ur61m2FIUujpIvVKWeUjdusfdj0La2NmeEXv/ZZ5+Fc845J7z55pth22237TZygetC1BXYWrhwYXjyySfD2rVrnV7KR/2QeneY9o527xHV8p7S/H9439hWiCTIKmdpbm4Ot9xyS7j77rs9Uqd6kF67OIo8Lq1YyTvEcAoMzTt0fv/99/DUU0+Fww47LLz//vthl112yUiljiVc8AEiEN4N7lFHHRUmTJgQvv76axdKTItPegRhElwcTDSyhgZfbPwuKKGzo9M7MNFXUXnDhg3htddeC+eee2548MEHA1MQylJwu7Z3hMLAn5ZU8Y4BeRgSGO++/PLLMGfOnPDII49k1HCiFGRs4WqO9O233zrT9913nzvNM888Ew466CB3grwQ0IMOzkK7OMuQ+iGhthiR0vb+b9/NMdA9+kHX6Apd//zzz+GJJ54It956a6Ya6qV2oYC63gGZzBoRo9E7MOTIA64ZyJFXrFgRbajAh/2ZOWNmfPzxx/3dHMfrU1G4xliGu27duvjKK69Eczavf/XVV8fPP/88Uidtozsu4cPGWKdpPai7qv/4MnQMoLv169fHv/76y795f2P+G9Gitev5qquuitYZ/X3S5ZOiDfNez6YPnq5atcrzPKJYTuZVPb1Ql8cYyaII32bU8PDDD4dZs2Y5CeYWZ599dvj+++/9O/VUcPFehcBffvklPProo6GpqcnrmnOFU089Ney6666FOUtxAuuF3fwhokHblFPgzQJmTW1hOQSP4qEbEgOuCL5TKCdDvh446IHJKXNDdPPrr7+G5557Llx33XVO8oEHHggXXHBBWLNmjX+vWbvG7YIOiTxMAZi3DBs2LAQiCt5Dz6UXWqWSD+V6qG/jm/EW3duef/5590hrLV555ZXRJrBZlHrvvfe8bO7cuRld8HmIIm+99VY84YQTvM64sePihx9+6FGByEAbNvlyWvBVKVAX+tAQntJKaQy0evDvNqrAPkQR6Rcc9IieTzrpJNfzKaecEt9++22PNMj5zTffeP6dd94Z//zzTxf9jz/+iNOnT4829MSTTz45uqNAuLcAA99991202bI3gpM8/fTTkeEHwEgAhqcsdRSENm+Ns2fNznDvv//+aBNgx2EIQTj4knNWamjqCzQUVSOfaPR3itzVDKOaDixevDjee++9mZ7vueeeaJHF9YozAQzxU6ZMiUuXLvXv5cuXx6lTpzrOWWedFW0+E33oYYUCEJ5qa2ptgkGdTcGoeCbh75NPPgkTJ04Mxki45JJLwhVXXBEaGxt9ODHhstlzfgLqNIwMkyRjyOmxdB4zZoxPXsFljwReqoG0vfq6+tBRU9icY7+lrr6w8QcP5UJ4NW1uKRz45EEnq1eu9mEE+Zx3TGGjquRwvRYZYbhBvz/99FO4/fbbw6uvvhqOP/54XwIfffTRBT3bKki62nPPPd1+I0aMcJvMmzcvmOMEc5JgUSbsu+++hVXPDTfc4LNgm/D4eCUCpRTAeGeeGFidAKxsTj/9dJ9PWM/1vBQ/FYBCBGtta3VmL590eTh//PnhgAMOyOYWOIiEd2Kb88cUicLgB57bW9t9vO4z+pvDW4W4chZWfzbx9C0DOhhzCIuerjfkQyYcChsgM/MK5o3AHXfc4Utglr/Qs2jzd1Cwb7YuwLHhJshJmLtMmzYtNDQ0uO68237xxRe+pD3uuOMC3gUDqTJ5F8O8o3TqXjThotD470ZvhDwYTp2klC7AR0iY3W233cIee+yR9ZRqo0ipdsiDZ9rjYX8GJcIn7aAYygHKBzLAp61WnEXkGDVqlPOMrpEldRjZADkPPfTQMH78+HDsscd6ByHSUJ86ivrgkmdThmDTg9BkC4qxY8eG2267Leyzzz5uJ3TljrLTTjuFww8/PNg8ITSYB9n8IDO4lAizEOfhnW1f8PSNAD0BeDIczAEYD8dRO0pTWuABpcrSeqXe1SZl6oVSLDxAM6PvsbwUlf7Lw6jwRwrQyw855BB3eL4xourwLQCHsp133tllRGZsJB3SUXmwI05CJMFJWKnOnDnTnUS2gaZbi5ADAsvRHXbYwR81mKaZQos9ECcBYKhSgAbMylF6wsu32VP9tFxKIU/vUixKUph2RdscJtYYbzjLAALxrXTHHXf0oQLe88YvxbZ3buYjtgkJDemTunQcOQkbb0QfW+mEBg03xc5MXXcURQOUB8CEPBjiNEYZeRhYDsK3BHDECv/ArBymEhTVd4Marpnd2q0Es3QdeEZJyIlcvEve0hj9mwu/8AowpAB8K1/DB50gdQTqUaemrquDgIvMK1euDOyl2ArH5zBMfDXcgJeuadxRpCQvNOJ8e57ZpKOzsP3LCkKrBhjojaGpnwK4OJvaUbtpHd7VBnWljELdgrPk6/fmGzps90s+eKETSNFZZNkMh+wNP93VxbBEfGC77bbL9CIcdV4cRbpUKh1SFx2iS+ozIeb3HZyESNJkw85ee+3ljkjgkB6yNniBKEQEVOKBQRHODy9iRDiVpMIhLeX9eRqqjxHhB16APC95vIq/zQmkXGQluqBE2s0UZT4pPiqmuxkV1S5t8sAXwGoTkA7IF+/giOeM11xfIl+dzbbl3UkYbsaNG+dzElZETJg9QFg7GR1vtTj05DP5hiF3EiJJL+YgRbplE4SCGc6ovP7668489GmLdvNCE8k4ZjD6yNHhiCOOCB32S2ZfA/wQXXRkgTbTrf++bq87etK76khfGBdgoYGe4JmHcnDSiapwSWVbnARna2lpCbNnz/YIwq/GLJ1xEtslD++8847rmOjFvpN0AB0femiMR6DoorFbZWpU9TYnZRJ18cUXV0zioYceciG2xFzT5bPoonkL+zzqHORtLcg7Cd/wBi+KLDgHQOQDsAk8kubtxHdKA50z3DTZMHPmmWeGGTNmuJMQSfht7sUXXwzs1wDmEV0m9oVWvWjwz6AGymvA3RKvS6MFEYVQJu/1sr8DTnlqFZRAC/pstNkPhl1CaDl0Zvq77757l3lUubrV5KfyKZKoB9Mr0x6b6qmatkrh0AYPtEmJFuieDTLZgGUxIP6op9Uq+XwL9E6K7hhKWOFwRmjy5Mm+NX/XXXeF/fbbz/GYBkyaNClceumlGX3RUlqIX/YFA6WGnEwxfTT7lzLYCBo9erT4qCjFeBk/FWH0olIiH7qQgWhTk1zl9YJqRVWlEzosoPbI51E+ZTgRdsrrIf3GQfiG92FDh4WWFS1h7py5YfKUyWHCfyaEadOn+e83zHdwItFHvpQO7QncUURUmXzLK5XXV6mEoA0Uwo+Q6aQp3474oL4E4X1LgctuEzmB5i0yXtqj+4oPZGSSbr8Tu4wYDiMy+aRM3/DUZmdexYN4TFPVJ4V3Iglb8zgJ85KmqU3uJC6PTdoBdQBweEpB2aFHyKWQyINgbw0HDsrVk07ISrWT1i9VvqXy3HETfclZCOPwLL6l1GocRrjI4MOc+T6/mpNPe+iW9nAW2mPHHKgtHsRSFCCP9qUr8qFHpGDy6k5SHG74JZjfiSSHeBD/pOXs7o6C9zIUsJkDwGglAFO+jLKdv96CmINZCZmnoTr5/K3xrbbFny+ZTZEYAUXLmOxeluM/5VN0MERaX/m0B23aYWghaqBfPZw2A7SfkrcRdOQkzF1YBjMn4bjAhRde6FvzLIM5hQ8PPJpqiE/JrO80dUdpaGjw4wVfffWVH39LJ1FpZRGiAZwKPAlEmcpTnFLv1JMCwEdIaEqAUjj9ncdyEV79PlH7378TkdeTs0g+UulJRpLM6IN3dr872go7qNSFPillgB0W8wgjG0GT5S1nRjhPgpNo4oqTsKHG7zc4CQ4uOuD1BtxRPv30U9/SPfHEEzfxsu6IcaXCjsl5NJI3EyYRTIzwngfKpCjV9d5kuHlBSuHn6W3Jb7UPzzx805vhH57Jc2cxJlSe5wfdqKyt1X6rMZVITuhQDk3qYEzokZe2rWMGZ5xxRp58uPbaa8ONN97oeEQSnSlha54tepxE9Eg1dG5CqJsMdxQu/6xeZaHNBIDZFGBWQpKPgAjHYejzzjvPD9OwrOKnbwmoXpCnwzf0UDCK4WCNHb8LxxxzjI+p9JJSuCmd/nqX0dQ+fAIYFv10p3x0Jh3yKy76k14lLzqhHt/U5eFb7R588MHuEMOHD3f90TZTBs4PETWIJumchINH2lCzc7ChubnZD4hxoImJrPiHTkXA4WoO1JrH+jlVM1Z2uDn/bkrxMmMw2jAV7TQ3XuUPR/45BwuY12bXMOwqqZfPmzuvcDi4eIDbhIq2hZyVLVu2zHFNidFWAP4+kP8gIw/8og90ZcbelOXimXDVo47epV/0Sj5XKnj0TT0zqj9pWeuGgo1kN/iwSBLtrIrrk3OudgzSecGutqvt+ZxL/u233zxftPn44YcfvNz2UrID15SnUPXhaojYWJjdCcFhrr/++mhHJJ0+AgIffPBBwRnmFR3FhEIpCDl//vxov994uU244scff9zlpL4zW1Q0yhhoIJ7cYcy5SdMHfvnG8GknQ34bgjyPToET4DRKJafTNYORlgLoABxKTw9DY3hAjmi3AaNdonM92xI5cjMCXHVIDsljvx4dBaOmApZ9T65zyBFgyI5SRht+vDELjfHll1/Ooouua9i4mbXhijLl4QjNzc2ZkDD77LPPugNCl3Lqih/y/hcg5VfRBn1JbkUfysizlWPmTPmeLHmhSRkP79CAJpHEji267m1OEn/88UdHoRznlG3JlzOhZ/vNJ7v1oOsaPTqKMyuOKkxhQA8oLctbsluBMHLzzTdHu9hV8roGeAql4HK/54UXXnBhwU0jE0pB4HIKBH8ggJxDhoQn3mVQUhxDOlOKHlL9i053Mun6BkO9rsvgJFzDALxNuw9FG4pk5K9ftz7aifxo85nMsexed7RLev592WWX9e3QI2E6LMKgDAlKPvd4Jk6c6A3bbb9o5y/9XVdKqQOOPxZ2EQYgn3nPNddc4/XtPG586aWX3IkoVxu8D1RAJgxju6fOL7LBNw5CfvpO5yA/iyomlPRaTj7KAekP3MceeyzaLQifZ1BGm9KxUvJwHuERQabYPR46pR1/jVz84h1HgS+Auils1hwlJSQmyGNiatdLvXEY4GHoUeMSWPjkK4/LR3Z5OsNFICZmlBf1JLT+Tc1mzrOlGAIZcAQcQg6A0inTQzkGow6RhJQyyd6TQAUdFOZB4NImbXBxizLllaNDW7QPgMddb9mHlPveunssW4lWnxwzMGK+lCM1Jfk1DHYDFyxY4HdbjQlfx5NShycFXwba2tyECPxKynWBhQsWhtNOO833AZYuXVZcJnbFS2ls9ffi9hBHKU2p2Z4Ky1mW/iw/tdQlNUN6HV+Wmhgsp1XPtiorYh/aWi6jM9plp5alMe89ATiAOaxvmLIHZtEl3HTTTZ6P7UTfM+yPbOX7KGmmM10Z30LLUleCfcEITHH7b//9989+X6DRVNgMkRdrk11FBKbOkWOODHblNHA5rbHxX141L0QX/H74kCwyGvLhENp0FL/oQ7IhH/WlK9XpDfvgCB88aKbf3dHCOQF4glf+pQhHDw488ED/j0vkA3m+ahbZPsqokaP6/H+KwISUxlFGNtYaGhr812KcQt7tXOX+gAeojpSbZz6HttU/5fjwZ2HfHYR3Ohv/EQo5+JYe5FAYS7JtLtPioRo6cmycDP6XLF4Sho8YHrbffvtNyLmj7L333i4kiA4k1UQVw+M3EQyKclJGyENpAIzxnRcya9/qUNeVbvWoq17qM55qePOW+/YP/MIjP4xy3hYHSOWUM1DP5gfZsQG+B4o88KIoAv/YDRl4UvChh4vmgzCoge400CeT2e4aGCz7Z2jgv5Wv8EtyIOYyAAAAAElFTkSuQmCC')`;
        }else{
            audioButton.style.backgroundImage = 'url('+settings.buttonImgSrc+')';
        }

        audioButton.state = true;

        var _urlType = toString.apply(settings.audioList);
        if(_urlType === '[object Object]'){
            var _temp = [];
            _temp.push(settings.audioList);
            settings.audioList = _temp;
        }

        if(!settings.audioList.length){
            console.error(__INFO__.plugins + '无音乐资源启动失败，请添加音乐资源 audioList');
            return;
        }

        if(typeof settings.audioList === 'object'){
            audioTag.src = settings.audioList[0].source;
            for(var i=0; i<settings.audioList.length; i++){
                var _option = new Option(settings.audioList[i].title, settings.audioList[i].source);
                audioList.add(_option);
            }
        }else{
            audioTag.src = settings.audioList;
            audioList.style.display = 'none';
        }

        var audioFn = {
            play: function(url) {
                if(url) audioTag.src = url;
                audioButton.style.backgroundPosition = "0";
                audioTag.play();
            },
            stop: function() {
                audioButton.style.backgroundPosition = "24px 0px";
                audioTag.pause();
            }
        };

        var _device = (/Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent));
        var clickEvtName = _device ? "touchstart" : "mousedown";

        //给按钮绑定事件
        audioButton.addEventListener(clickEvtName, function(e){
            //判断播放状态
            if(this.state) {
                this.state = false;
                audioFn.stop();
            }else{
                this.state = true;
                audioFn.play();
            }
        });

        //从下拉列表选择歌曲播放
        audioList.addEventListener("change", function(e){
            var muiscName = this.options[this.selectedIndex].value;
            audioFn.play(muiscName);
            audioButton.state = true;
        });

        //判断是否是微信
        if(navigator.userAgent.toLowerCase().match(/micromessenger/i)) {
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady(){
                WeixinJSBridge.invoke("getNetworkType", {}, function(e){
                    audioFn.play();
                });
            });
        }
    };
    
    global[__INFO__.plugins] = PlayCode;
})(typeof window !== 'undefined' ? window : this);