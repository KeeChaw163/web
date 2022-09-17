function CheckAll(elementsA,elementsB)
{
    var len = elementsA;
    if(len.length > 0)
    {
        for(i=0;i<len.length;i++)
        {
            elementsA[i].checked = true;
			
        }
        if(elementsB.checked ==false)
        {
            for(j=0;j<len.length;j++)
            {
                elementsA[j].checked = false;
            }
        }
    }
    else
    {
        len.checked = true;
        if(elementsB.checked == false)
        {
            len.checked = false;
        }
    }
}
function CheckPart(elementsA)
{
    var len = elementsA;
    if(len.length > 0)
    {
        for(i=0;i<len.length;i++)
		{
			if(elementsA[i].checked == true)
			{
				elementsA[i].checked = false;
			}
			else{
				elementsA[i].checked = true;
			}
		}
    }
    else
    {
        len.checked = true;
        if(elementsB.checked == false)
        {
            len.checked = false;
        }
    }
}
function CheckShow(elementsA)
{
	var len = elementsA;
	for(i=0;i<len.length;i++)
	{
		if(elementsA[i].checked == true)
		{
			alert(document.getElementById("tab").rows[i+2].cells[2].innerHTML);
		}
	}
}
